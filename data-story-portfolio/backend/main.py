from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json
from pathlib import Path
import os
import time
import re
import openai
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()  # This will load the .env file from the root by default
openai.api_key = os.getenv("OPENAI_API_KEY")

# --- Enhanced Data Loading ---
def load_personal_profile() -> Dict[str, Any]:
    data_path = Path(__file__).parent.parent / "shared" / "data.json"
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
GREETING_RESPONSE = """Hello! I'm Fiona's AI assistant. You can ask me about my technical skills and projects, work experience and relocation, education and certifications, areas of expertise, or why I would be a good fit for your team. How can I help you today?"""

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
def query_openai(question: str, personal_info: str) -> str:
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a professional AI assistant helping recruiters understand Fiona's professional profile. "
                        "Respond clearly and concisely with relevant, professional information based on the given profile. "
                        "Keep responses under 100 words."
                    )
                },
                {
                    "role": "user",
                    "content": f"My profile: {personal_info}\n\nQuestion: {question}"
                }
            ],
            temperature=0.2,
            max_tokens=200,
            top_p=0.9,
        )
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        print(f"OpenAI API error: {e}")
        return "Sorry, I couldn't process your question at the moment."


@app.post("/ask")
async def ask_question(question: Question):
    try:
        # Check if the input is a greeting
        if is_greeting(question.text):
            return {"answer": GREETING_RESPONSE}
        
        personal_info = json.dumps(personal_data, ensure_ascii=False)
        raw_answer = query_openai(question.text, personal_info)
        
        return {"answer": raw_answer}
        
    except Exception as e:
        print(f"Error processing question: {e}")  # Server-side logging
        return {"answer": "I apologize, but I couldn't process your question at the moment."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)