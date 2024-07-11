# build stage
FROM node:20-alpine

RUN npm install -g http-server

WORKDIR /app

COPY . .

RUN rm -rf node_modules dist

RUN npm install

RUN chmod +x build.sh

EXPOSE 8080

CMD [ "sh", "build.sh" ]
