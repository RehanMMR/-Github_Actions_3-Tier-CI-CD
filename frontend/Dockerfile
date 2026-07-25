FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/server.js ./
COPY --from=builder /app/public ./public

EXPOSE 8080

CMD ["node", "server.js"]