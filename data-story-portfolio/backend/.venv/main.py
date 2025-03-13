from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json
from pathlib import Path

# Load your data
data_path = Path(__file__).parent.parent / "../shared/data.json"
with open(data_path, "r") as f:
    personal_data = json.load(f)

# Initialize FastAPI
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境应限制域名
    allow_methods=["*"],
    allow_headers=["*"],
)

# 从环境变量获取 API Key
import os
HF_API_KEY = os.getenv("HF_API_KEY", "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")  # 替换为你的实际 Key

class Question(BaseModel):
    text: str

@app.post("/ask")
async def ask_question(question: Question):
    try:
        # 调用 Hugging Face 的 Mistral 7B 模型
        API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
        headers = {"Authorization": f"Bearer {HF_API_KEY}"}
        
        # 构建符合模型要求的输入格式
        payload = {
            "inputs": f"[INST] {question.text} [/INST]",
            "parameters": {
                "max_new_tokens": 200,
                "temperature": 0.7
            }
        }
        
        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status()  # 检查 HTTP 错误
        
        result = response.json()
        return {"answer": result[0]['generated_text']}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)