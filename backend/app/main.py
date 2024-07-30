from fastapi import FastAPI, HTTPException
import json
from .rag import generate_answer

app = FastAPI()

# 미리 계산된 예측 값 로드
with open('data/predictions.json', 'r') as f:
    predictions = json.load(f)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/predictions")
def get_predictions():
    return predictions

@app.post("/chat")
def chat(question: str):
    try:
        answer = generate_answer(question)
        return {"response": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
