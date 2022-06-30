FROM node:16.15-alpine3.16 as base

WORKDIR /app
COPY package*.json ./
COPY . . 
EXPOSE 5003

FROM base as dev

RUN npm install
CMD ["node", "server.js"]
