FROM node:20-alpine

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY ./backend .

RUN rm -rf node_modules

RUN npm install

COPY wait-for-postgres.sh /usr/wait-for-postgres.sh

RUN chmod +x /usr/wait-for-postgres.sh

# RUN npm run prisma:init
 
RUN npm run prisma:generate
 
CMD ["/bin/sh", "-c", "/usr/wait-for-postgres.sh ${DATABASE_HOST} ${POSTGRES_USER} npm run prisma:migrate dev && npm run start:prod"]

EXPOSE 3000