from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json
from pathlib import Path
import os
import time
import re
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
You are a professional AI assistant helping recruiters understand Fiona's professional profile. 

Rules for response:
1. Be clear and concise
2. Highlight key professional attributes
3. Provide specific, relevant information
4. Keep responses professional and under 100 words
5. Focus on skills, experience, and value proposition

My professional profile:
{personal_info}

Current question:
{question}

Response format:
- Be direct and informative
- Use professional language
- Emphasize unique professional strengths
[/INST]"""

# --- Greeting Template (without bullet points) ---
GREETING_RESPONSE = """Hello! I'm Fiona's AI assistant. You can ask me about my technical skills and programming languages, work experience and projects, education and certifications, areas of expertise, or why I would be a good fit for your team. How can I help you today?"""

class Question(BaseModel):
    text: str

# --- Function to detect greetings ---
def is_greeting(text: str) -> bool:
    greeting_patterns = [
        r'\b(?:hi|hello|hey|greetings|howdy|hi there|hola|good morning|good afternoon|good evening)\b',
        r'^(?:yo|sup|what\'s up|wassup)$'
    ]
    
    # Convert to lowercase and check against patterns
    text_lower = text.lower().strip()
    
    for pattern in greeting_patterns:
        if re.search(pattern, text_lower):
            return True
        
    # Check if very short question (likely a greeting)
    if len(text_lower.split()) <= 2 and len(text_lower) < 10:
        return True
        
    return False

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
        # Check if the input is a greeting
        if is_greeting(question.text):
            return {"answer": GREETING_RESPONSE}
        
        formatted_prompt = PROMPT_TEMPLATE.format(
            personal_info=json.dumps(personal_data, ensure_ascii=False),
            question=question.text
        )
        
        payload = {
            "inputs": formatted_prompt,
            "parameters": {
                "max_new_tokens": 200,  # Reduce max tokens
                "temperature": 0.2,     # Make response more focused
                "top_p": 0.9            # Maintain coherence
            }
        }
        
        result = query_hf_api(payload)
        
        # Remove any formatting markers, limit length
        raw_answer = result[0]['generated_text'].split("[/INST]")[-1].strip()
        raw_answer = raw_answer.replace("【Key Points】", "").replace("【Detailed Explanation】", "").strip()
        raw_answer = raw_answer.replace("【Project Examples】", "").strip()
        
        return {"answer": raw_answer}
        
    except Exception as e:
        print(f"Error processing question: {e}")  # Server-side logging
        return {"answer": "I apologize, but I couldn't process your question at the moment."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)