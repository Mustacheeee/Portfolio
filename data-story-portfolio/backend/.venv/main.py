from fastapi import FastAPI
from scripts.career_advisor import get_career_advice

app = FastAPI()

@app.get("/advice")
def get_advice(skill: str):
    return {"advice": get_career_advice(skill)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)