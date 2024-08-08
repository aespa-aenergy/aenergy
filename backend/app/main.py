from fastapi import FastAPI, HTTPException
import json
from datetime import datetime #오늘 날짜
from .rag import generate_answer

app = FastAPI()
current_year = datetime.now().year
current_month = datetime.now().month

# 미리 계산된 예측 값 로드
with open('app/data/karina.json', 'r') as k:
    production = json.load(k)
    #2019.01 - 2026.12

with open('app/data/winter.json', 'r') as w:
    consumption = json.load(w)
    #2002.01 - 2026.12


@app.get("/")
def read_root():
    return {"AENERGY": "TEST"}
"""
@app.get("/production")
def get_production():
    return get_production(current_year, current_month)

@app.get("/production/{year}/{month}")
def get_production(year:str, month:str):
    

@app.get("/consumption")
def get_consumption():
    return consumption
"""

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
