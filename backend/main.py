from fastapi import FastAPI

from pydantic import BaseModel #뭔지 모름;
import databases #database 연결
import sqlalchemy #database 연결
import tensorflow as tf #텐서플로우

#DB 준비
#DATABASE_URL = "postgresql://user:password@localhost/dbname"
#database = databases.Database(DATABASE_URL)
#metadata = sqlalchemy.MetaData() #이게 뭔데
#engine = sqlalchemy.create_engine(DATABASE_URL) #뭐야
#metadata.create_all(engine) #어....

app = FastAPI()

class PredictionRequest(BaseModel):
    feature1: float
    feature2: float

class PredictionResponse(BaseModel):
    prediction: float

class Item(BaseModel):
    name: str
    description: str
    price: float
    tax: float = None

"""
@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnectt()
"""
#endpoints
@app.get("/")
def read_root():
    return {"Hello": "World"}

if __name__ =="__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

"""
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.post("/items/")
def create_item(item: Item):
    return item

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    #사전 훈련 모델 로딩
    model = tf.keras.models.load_model('모델패스')

    #예측 실행
    prediction = model.predict([[request.featured, request.feature2]])
    result = prediction[0][0] #결과는 나도 모르는디 일단 00

    return PredictionResponse(prediction=result)

#데이터 조회
@app.get("/data")
async def get_data():
    query = "SELECT * FROM table" #테이블 이름
    results = await database.fetch_all(query=query)
    return results

"""


# 엔드포인트와 로직 추가