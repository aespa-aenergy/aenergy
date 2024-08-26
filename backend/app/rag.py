import os
from langchain.storage import LocalFileStore
from langchain.prompts import PromptTemplate
from langchain_core.prompts import ChatPromptTemplate
from langchain.embeddings import CacheBackedEmbeddings
from langchain_community.chat_models import ChatOllama
from langchain_core.runnables import RunnablePassthrough
from langchain_community.vectorstores.faiss import FAISS
from langchain_core.output_parsers import StrOutputParser
from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings.huggingface import HuggingFaceEmbeddings
from langchain_community.document_loaders.unstructured import UnstructuredFileLoader

# 처음 한 번만 실행되도록 전역 변수를 설정합니다.
if 'rag_chain' not in globals():
    
    USE_BGE_EMBEDDING = True

    # LangChain이 지원하는 다른 채팅 모델을 사용합니다. 여기서는 Ollama를 사용합니다.
    llm = ChatOllama(model="EEVE-Korean-10.8B:latest")

    # 필수 디렉토리 생성
    if not os.path.exists(".cache"):
        os.mkdir(".cache")
    if not os.path.exists(".cache/embeddings"):
        os.mkdir(".cache/embeddings")
    if not os.path.exists(".cache/files"):
        os.mkdir(".cache/files")


    def embed_files(file_paths):
        all_docs = []
        for file_path in file_paths:
            # 파일별 캐시 디렉토리 설정
            cache_dir = LocalFileStore(f"./.cache/embeddings/{os.path.basename(file_path)}/")
            
            # 텍스트를 청크로 분할
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=500,
                chunk_overlap=50,
                separators=["\n\n", "\n", "(?<=\. )", " ", ""],
                length_function=len,
            )
            loader = UnstructuredFileLoader(file_path)
            docs = loader.load_and_split(text_splitter=text_splitter)
            all_docs.extend(docs)  # 모든 문서를 하나의 리스트로 결합

        print("*********"*8)
        print("Embedding Starts...")

        # BGE Embedding: 
        model_name = "BAAI/bge-m3"
        model_kwargs = {
            "device": "cpu"  # 필요에 따라 "cuda" 또는 "mps"로 변경
        }
        encode_kwargs = {"normalize_embeddings": True}
        embeddings = HuggingFaceEmbeddings(
            model_name=model_name,
            model_kwargs=model_kwargs,
            encode_kwargs=encode_kwargs,
        )
        cached_embeddings = CacheBackedEmbeddings.from_bytes_store(
            embeddings, cache_dir)

        vectorstore = FAISS.from_documents(all_docs, embedding=cached_embeddings)
        vector_retriever = vectorstore.as_retriever()

        print("Embedding is Done!")
        print("*********"*8)
        return vector_retriever
    
    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)
    
    # 여러 파일 경로를 리스트로 지정
    file_paths = [
        "documents/태양광 발전소 부지 추천 정보.pdf"
    ]
    
    retriever = embed_files(file_paths)
    
    RAG_PROMPT_TEMPLATE = """당신은 질문에 친절하게 답변하는 AI 입니다. 학습한 문서에 기반하여 질문에대한 내용만 답하세요. 다른 추가적인 답변은 하지 마세요. 질문의 답변을 찾을 수 없으면 모른다고 답변하세요.
    Question: {question} 
    Context: {context} 
    Answer:"""
    prompt = ChatPromptTemplate.from_template(RAG_PROMPT_TEMPLATE)

    # 체인을 생성합니다.
    rag_chain = (
        {
            "context": retriever | format_docs,
            "question": RunnablePassthrough(),
        }
        | prompt
        | llm
        | StrOutputParser()
    )

# rag_chain을 사용하여 질문에 대한 답변을 생성할 수 있습니다.
