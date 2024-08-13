# Use the official Python image from the Docker Hub
FROM python:3.11.9

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install the required dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the FastAPI application code
COPY app/ .

# 데이터셋과 인덱스를 생성하는 스크립트 실행
#RUN python app/rag.py

# Command to run the FastAPI application
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
