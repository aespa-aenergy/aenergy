#!/bin/bash

# ollama 서버를 백그라운드에서 실행
ollama serve &

# 서버의 기본 포트 설정 (예: 11434)
OLLAMA_PORT=11434

# 서버가 준비될 때까지 반복 확인
until curl -s http://localhost:$OLLAMA_PORT/health > /dev/null; do
    echo "Waiting for Ollama server to be ready..."
    sleep 2
done

# 모델 생성 및 실행
cd /app/ollama-modelfile
ollama create EEVE-Korean-10.8B -f EEVE-Korean-Instruct-10.8B-v1.0/Modelfile
ollama run EEVE-Korean-10.8B:latest &
cd ..

# FastAPI 애플리케이션 실행
uvicorn server:app --host 0.0.0.0 --port 8000 --app-dir /app
