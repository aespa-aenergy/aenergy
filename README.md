<p align="center">
	<img width="700" src="https://i0.wp.com/erizos.mx/wp-content/uploads/2020/10/aespa.jpg?w=1300&ssl=1" alt="aespa" />
</p>

<div align="center">
<img src="https://img.shields.io/badge/python-v3.11.0-skyblue"/>&nbsp;
<img src="https://img.shields.io/badge/fastapi-v0.110.1-orange"/>&nbsp;
<img src="https://img.shields.io/badge/docker-v27.0.3-blue"/>&nbsp;
<img src="https://img.shields.io/badge/npm-v10.8.1-navy"/>&nbsp;
<img src="https://img.shields.io/badge/node.js-v20.16.0-yellow"/>&nbsp;
<img src="https://img.shields.io/badge/langserve-v0.0.51-lightgray"/>&nbsp;
<img src="https://img.shields.io/badge/openai-v1.17.1-pink"/>&nbsp;
<img src="https://img.shields.io/badge/react-v18.3.1-green"/>&nbsp;
</div>


 ## About Team
|<img src="https://github.com/user-attachments/assets/cfffae2a-2266-44ba-b0e0-449845ac4fbf" width="150" height="150"/>|<img src="https://github.com/aespa-aenergy/aenergy/assets/126852968/3c4123fa-5c3f-48a3-9825-8ddfc0cb98b4" width="150" height="150"/>|<img src="https://github.com/aespa-aenergy/aenergy/assets/126852968/f6ec0dca-c578-4f24-bc40-2e1d0ea03cd6" width="150" height="150"/>|<img src="https://github.com/aespa-aenergy/aenergy/assets/126852968/af1c46a6-c37b-4f18-97fc-e6609eb2c011" width="150" height="150"/>|
|:-:|:-:|:-:|:-:|
|윤한결<br/>[@hangyeol17](https://github.com/hangyeol17)|정영현<br/>[@yh-skku](https://github.com/yh-skku)|조하린<br/>[@jxharin](https://github.com/jxharin)|채원석<br/>[@1suckk](https://github.com/1suckk)|
|PM / BE<br/>|DA<br/>|FE<br/>|DA|

<br/><br/>

## Description
ai모델 기반의 전력 수요량/태양광 발전량 예측 및 태양광 발전소 입지추천 플랫폼 서비스 구축

<br/><br/>
## Installation
<br/>
linux ubuntu 22.04 LTS
   
   ```bash
   $ git clone https://github.com/aespa-aenergy/aenergy.git
   ```

[링크](https://huggingface.co/heegyu/EEVE-Korean-Instruct-10.8B-v1.0-GGUF/tree/main)에서 ggml-model-Q5_K_M.gguf 모델
ollama-modelfile/EEVE-Korean-Instruct-10.8B-v1.0/ 디렉토리에 넣기

<br/><br/>
## Running the app

   ```
   $ docker compose build
   ```
   ```
   $ docker compose up
   ```
   ![image](https://github.com/user-attachments/assets/53ce2b4e-1b03-4416-8327-2ab49eaf96cf)

<br/><br/>
도커를 띄운 리눅스 환경에 접속 아래 명령어로 ngrox 다운
   ```bash
   $ curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
	| sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
	&& echo "deb https://ngrok-agent.s3.amazonaws.com buster main" \
	| sudo tee /etc/apt/sources.list.d/ngrok.list \
	&& sudo apt update \
	&& sudo apt install ngrok
   ```
ngrok 도메인이 2개 필요(하나는 프론트 하나는 백엔드)
ngrok 계정 연결

   frontend
   토큰 설정
   ```bash
   $ ngrok config add-authtoken 2keOacchGwN9itiJfrp2KLTzk53_q7mUJAbE6HMNEzgJUgnp
   ```
   고정 도메인 deploy
   ```bash
   $ ngrok http --domain=honest-trivially-herring.ngrok-free.app 80
   ```

   backend
   토큰 설정
   ```bash
   $ ngrok config add-authtoken 2kjiuuUYapmKiauhRsj8Q3yZj2x_2HbMS9tzryJ86WK9S9uu6
   ```
   고정 도메인 deploy
   ```bash
   $ ngrok http --domain=inviting-mutt-loosely.ngrok-free.app 8000
   ```

   [front domian](https://honest-trivially-herring.ngrok-free.app)

   [back domian](inviting-mutt-loosely.ngrok-free.app)
    
<br/><br/><br/><br/>
