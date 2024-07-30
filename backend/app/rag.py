import faiss
import numpy as np
from transformers import RagTokenizer, RagRetriever, RagSequenceForGeneration, DPRContextEncoder, DPRContextEncoderTokenizer
from datasets import Dataset

# 문서 준비
documents = [
    {"title": "Paris", "text": "The capital of France is Paris."},
    {"title": "Jupiter", "text": "The largest planet in the solar system is Jupiter."},
    {"title": "Great Wall of China", "text": "The Great Wall of China is one of the Seven Wonders of the World."}
]

# 데이터셋 생성
dataset = Dataset.from_list(documents)

# 문서 인덱싱
def index_documents(dataset):
    tokenizer = DPRContextEncoderTokenizer.from_pretrained("facebook/dpr-ctx_encoder-single-nq-base")
    model = DPRContextEncoder.from_pretrained("facebook/dpr-ctx_encoder-single-nq-base")
    
    def embed(batch):
        inputs = tokenizer(batch['text'], return_tensors="pt", padding=True, truncation=True)
        embeddings = model(**inputs).pooler_output.detach().numpy()
        return {"embeddings": [embedding for embedding in embeddings]}
    
    dataset = dataset.map(embed, batched=True, batch_size=8)
    
    # 데이터셋과 인덱스 저장
    dataset.save_to_disk("/app/data/my_dataset")
    dataset.add_faiss_index(column="embeddings")
    dataset.get_index("embeddings").save("/app/data/my_index")

# 인덱싱 수행
index_documents(dataset)

# 데이터셋과 인덱스 경로 설정
dataset_path = "/app/data/my_dataset"
index_path = "/app/data/my_index"

# RAG 모델 초기화
tokenizer = RagTokenizer.from_pretrained("facebook/rag-sequence-nq")
retriever = RagRetriever.from_pretrained(
    "facebook/rag-sequence-nq",
    index_name="custom",
    passages_path=dataset_path,
    index_path=index_path
)
model = RagSequenceForGeneration.from_pretrained("facebook/rag-sequence-nq", retriever=retriever)

def generate_answer(question):
    inputs = tokenizer(question, return_tensors="pt")
    outputs = model.generate(input_ids=inputs.input_ids)
    answer = tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]
    return answer
