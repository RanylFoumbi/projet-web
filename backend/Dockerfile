# FROM node:20-alpine

# RUN apk add --no-cache postgresql-client

# WORKDIR /app

# COPY ./backend .

# RUN rm -rf node_modules

# RUN npm install

# COPY wait-for-postgres.sh /usr/wait-for-postgres.sh

# RUN chmod +x /usr/wait-for-postgres.sh

# # RUN npm run prisma:init
 
# RUN npm run prisma:generate
 
# CMD ["/bin/sh", "-c", "/usr/wait-for-postgres.sh ${DATABASE_HOST} ${POSTGRES_USER} npm run prisma:migrate dev && npm run start:prod"]

# EXPOSE 3000

FROM node:20-bullseye as builder

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm install --frozen-lockfile

RUN npx prisma generate

RUN npm run build

FROM node:20-alpine as runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/dist .

RUN npm install --production && npm cache clean --force

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node main.js"]