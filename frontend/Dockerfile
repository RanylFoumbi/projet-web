FROM node:20-alpine

RUN npm install -g http-server

WORKDIR /app

COPY ./frontend .

RUN rm -rf node_modules dist

RUN npm install

RUN npx patch-package

RUN npm run build

RUN npm run preview

CMD ["http-server", "dist", "-p", "5173"]

EXPOSE 5173