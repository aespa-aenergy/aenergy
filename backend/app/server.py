from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Union
from langserve.pydantic_v1 import BaseModel, Field
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langserve import add_routes
from chain import chain as chain_chain
from translator import chain as EN_TO_KO_chain
from llm import llm as model
from xionic import chain as xionic_chain
from rag import rag_chain  # RAG 체인 임포트

app = FastAPI()

"""
# 미리 계산된 예측 값 로드
with open('app/data/power_prediction_data.json', 'r') as p:
    winter = json.load(p)

with open('app/data/measure.json', 'r') as m:
    karina = json.load(m)

@app.get("/")
def read_root():
    return

@app.get("/predictions")
def get_predictions():
    return winter

""" 

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

"""
@app.get("/")
async def redirect_root_to_docs():
    return RedirectResponse("/xionic/playground")

"""

add_routes(app, chain_chain, path="/prompt")


class InputChat(BaseModel):
    """Input for the chat endpoint."""

    messages: List[Union[HumanMessage, AIMessage, SystemMessage]] = Field(
        ...,
        description="The chat messages representing the current conversation.",
    )

# 기존 chat_chain 대신 rag_chain 사용
add_routes(
    app,
    rag_chain.with_types(input_type=InputChat),
    path="/chat",
    enable_feedback_endpoint=True,
    enable_public_trace_link_endpoint=True,
    playground_type="chat",
)

add_routes(app, EN_TO_KO_chain, path="/translate")

add_routes(app, model, path="/llm")

add_routes(
    app,
    xionic_chain.with_types(input_type=InputChat),
    path="/xionic",
    enable_feedback_endpoint=True,
    enable_public_trace_link_endpoint=True,
    playground_type="chat",
)

@app.post("/chat")
async def chat(request: InputChat):
    try:
        # 사용자의 마지막 메시지를 추출
        last_message = request.messages[-1].content

        # RAG 체인에서 결과 가져오기
        result = rag_chain.invoke(last_message)

        # 결과를 JSON으로 반환
        return {"response": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)