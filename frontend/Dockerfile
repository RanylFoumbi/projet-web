FROM node:20-alpine

RUN npm install -g http-server

WORKDIR /app

COPY . .

RUN rm -rf node_modules dist

RUN npm install

EXPOSE 5173