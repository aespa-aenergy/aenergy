<p align="center">
	<img width="700" src="https://i0.wp.com/erizos.mx/wp-content/uploads/2020/10/aespa.jpg?w=1300&ssl=1" alt="aespa" />
</p>

<div align="center">
<img src="https://img.shields.io/badge/python-3.9.10-skyblue"/>&nbsp;
<img src="https://img.shields.io/badge/fastapi-v-orange"/>&nbsp;
<img src="https://img.shields.io/badge/docker-27.0.3-blue"/>&nbsp;
<img src="https://img.shields.io/badge/npm-10.8.1-navy"/>&nbsp;
</div>

 ## About Team
|<img src="https://github.com/user-attachments/assets/cfffae2a-2266-44ba-b0e0-449845ac4fbf" width="150" height="150"/>|<img src="https://github.com/aespa-aenergy/aenergy/assets/126852968/3c4123fa-5c3f-48a3-9825-8ddfc0cb98b4" width="150" height="150"/>|<img src="https://github.com/aespa-aenergy/aenergy/assets/126852968/f6ec0dca-c578-4f24-bc40-2e1d0ea03cd6" width="150" height="150"/>|<img src="https://github.com/aespa-aenergy/aenergy/assets/126852968/af1c46a6-c37b-4f18-97fc-e6609eb2c011" width="150" height="150"/>|
|:-:|:-:|:-:|:-:|
|윤한결<br/>[@hangyeol17](https://github.com/hangyeol17)|정영현<br/>[@yh-skku](https://github.com/yh-skku)|조하린<br/>[@jxharin](https://github.com/jxharin)|채원석<br/>[@1suckk](https://github.com/1suckk)|
|PM / BE<br/>|DA<br/>|FE<br/>|DA|


## Description
머신러닝 기반의 신재생 에너지 발전량 예측 및 적지분석 플랫폼 서비스 구축


## Installation

1. 사용 운영체제 -> linux ubuntu 22.04 LTS
2. 본 레포지토리를 clone하기
3. https://huggingface.co/heegyu/EEVE-Korean-Instruct-10.8B-v1.0-GGUF/tree/main 에서 ggml-model-Q5_K_M.gguf 모델 다운받기
4. 다운받은 모델을 ollama-modelfile/EEVE-Korean-Instruct-10.8B-v1.0/ 아래에 넣기
5. 준비 끝!


## Running the app

1. 클론한 본 레포지토리로 이동
2. docker-compose build로 빌드하기
3. docker-compose up으로 실행
4. langserve가 실행됨
   ![image](https://github.com/user-attachments/assets/53ce2b4e-1b03-4416-8327-2ab49eaf96cf)

5. 도커를 띄운 리눅스 환경에 접속
6. 아래 명령어로 ngrox 다운
   $ curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
	| sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
	&& echo "deb https://ngrok-agent.s3.amazonaws.com buster main" \
	| sudo tee /etc/apt/sources.list.d/ngrok.list \
	&& sudo apt update \
	&& sudo apt install ngrok
7. ngrok에서는 개인당 하나의 도메인을 무료로 줌. - 도메인이 2개 필요(하나는 프론트 하나는 백엔드)
   ngrok 계정 연결
   (winter - ngrok config add-authtoken 2keOacchGwN9itiJfrp2KLTzk53_q7mUJAbE6HMNEzgJUgnp)
   (ningning - ngrok config add-authtoken 2WNcdM9JDk7vMBok2lKC19gKkFC_3AWrQZENi8EFabG8BfAex)
8. winter가 받은 도메인 - https://honest-trivially-herring.ngrok-free.app
   ningning이 받은 도메인 - https://ad95-183-101-98-59.ngrok-free.app
	내가 받은 도메인 >< - https://dove-accurate-maggot.ngrok-free.app
9. 리눅스 환경을 두개로 만든 다음, winter 계정으로 연결해서 프론트 명령어 작성, 다른 하나 환경에서는 ningning 계정으로 접속해서 두번째 명령어(백엔드)로 도메인-로컬 포워딩
   $ ngrok http domain=https://honest-trivially-herring.ngrok-free.app 80 (프론트)
   $ ngrok http domain=https://ad95-183-101-98-59.ngrok-free.app 8000 (백엔드)
10. https://honest-trivially-herring.ngrok-free.app 주소로 접속하면 끝




## Test

