FROM node:18

WORKDIR /app

COPY . .

# 의존성 설치 + Next 빌드
RUN npm install && npm run build

# 서버 실행 (app.ts → next + express)
CMD ["npm", "run", "start"]
