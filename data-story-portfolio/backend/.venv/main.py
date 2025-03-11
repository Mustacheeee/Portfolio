from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
import json
from pathlib import Path

# Load data
data_path = Path(__file__).parent.parent / "../shared/data.json"
try:
    with open(data_path, "r") as f:
        personal_data = json.load(f)
except FileNotFoundError:
    print(f"Error: File not found at {data_path.absolute()}")
    print("1. Create a 'shared' folder in project root")
    print("2. Add data.json with your personal info")
    exit(1)
print("Looking for file at:", data_path.absolute())


# Initialize FastAPI
app = FastAPI()

# Set up OpenAI
openai.api_key = "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"

class Question(BaseModel):
    text: str

@app.post("/ask")
def ask_question(question: Question):
    try:
        # Create a prompt with your data
        prompt = f"""
        You are a virtual representative of {personal_data['name']}, a computer science graduate.
        Your task is to answer questions about {personal_data['name']}'s skills, projects, and experiences.
        Here is some information about {personal_data['name']}:
        - Skills: {', '.join(personal_data['skills'])}
        - Projects: {json.dumps(personal_data['projects'], indent=2)}
        - Work Experience: {json.dumps(personal_data['workExperience'], indent=2)}
        - Career Goals: {personal_data['careerGoals']}
        - Interests: {', '.join(personal_data['interests'])}

        Answer the following question: {question.text}
        """

        # Get response from OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "system", "content": prompt}]
        )

        return {"answer": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)