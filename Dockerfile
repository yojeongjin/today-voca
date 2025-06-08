FROM node:18

WORKDIR /app

<<<<<<< HEAD
=======
COPY package*.json ./
RUN npm install

>>>>>>> ddffc3f (Dockerfile 수정)
COPY . .

# 의존성 설치 + Next 빌드
RUN npm install && npm run build

# 서버 실행 (app.ts → next + express)
CMD ["npm", "run", "start"]
