# Use the official Python image from the Docker Hub
FROM python:3.11.9

# Set the working directory
WORKDIR /app

# Install system dependencies including libGL, poppler-utils, and Tesseract
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    poppler-utils \
    tesseract-ocr \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file
COPY app/ /app/

# Install the required dependencies
RUN pip install --no-cache-dir -r requirements.txt

# ollama 패키지 다운로드 및 설치
RUN curl -fsSL https://ollama.com/install.sh | sh

# start.sh 스크립트 복사
COPY start.sh /start.sh

# start.sh에 실행 권한 부여
RUN chmod +x /start.sh

# Command to run the custom start script
CMD ["/start.sh"]
