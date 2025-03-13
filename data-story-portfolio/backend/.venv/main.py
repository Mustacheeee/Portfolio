from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json
from pathlib import Path
import os
import time
from typing import Dict, Any

# --- Enhanced Data Loading ---
def load_personal_profile() -> Dict[str, Any]:
    data_path = Path(__file__).parent.parent / "../shared/data.json"
    try:
        with open(data_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            # Validate required fields
            required_fields = ["skills", "projects", "workExperience"]
            for field in required_fields:
                if field not in data:
                    raise ValueError(f"Missing required field: {field}")
            return data
    except (FileNotFoundError, json.JSONDecodeError) as e:
        raise RuntimeError(f"Failed to load personal data: {str(e)}")

personal_data = load_personal_profile()

# --- Initialize FastAPI ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (restrict in production)
    allow_methods=["*"],
    allow_headers=["*"],
)

HF_API_KEY = os.getenv("HF_API_KEY", "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")

# --- Core Prompt Template ---
PROMPT_TEMPLATE = """[INST]
You are my AI-powered job search assistant. Your task is to answer recruiter questions based on my personal profile. Always:

1. Use a professional yet friendly tone.
2. Provide specific examples from my projects to demonstrate skills.
3. When comparing technologies, showcase analytical thinking.

My personal information:
{personal_info}

Current question:
{question}

Please structure your answer as follows:
【Key Points】Summarize the answer in 3 bullet points.
【Detailed Explanation】Elaborate on each point step-by-step.
【Project Examples】Reference relevant projects and achievements.
[/INST]"""

class Question(BaseModel):
    text: str

# --- API Call with Retry Mechanism ---
def query_hf_api(payload: Dict, retries: int = 3) -> Dict:
    API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
    headers = {"Authorization": f"Bearer {HF_API_KEY}"}
    
    for attempt in range(retries):
        try:
            response = requests.post(API_URL, headers=headers, json=payload, timeout=30)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError as e:
            if "Model is loading" in response.text:
                wait_time = int(response.headers.get("estimated_time", 30))
                print(f"Model loading, retrying in {wait_time}s...")
                time.sleep(wait_time)
                continue
            raise
        except (requests.exceptions.Timeout, requests.exceptions.ConnectionError):
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
                continue
            raise
    return {}

@app.post("/ask")
async def ask_question(question: Question):
    try:
        # Build the prompt
        formatted_prompt = PROMPT_TEMPLATE.format(
            personal_info=json.dumps(personal_data, ensure_ascii=False),
            question=question.text
        )
        
        payload = {
            "inputs": formatted_prompt,
            "parameters": {
                "max_new_tokens": 500,  # Limit response length
                "temperature": 0.3,     # Reduce randomness
                "repetition_penalty": 1.2,  # Avoid repetition
                "top_p": 0.95           # Focus on high-probability words
            }
        }
        
        result = query_hf_api(payload)
        
        if not result:
            raise HTTPException(status_code=500, detail="API response empty")
            
        # Parse the response
        raw_answer = result[0]['generated_text'].split("[/INST]")[-1].strip()
        
        return {"answer": raw_answer}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)