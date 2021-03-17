FROM node:14.15.2-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn --pure-lockfile

COPY . .

EXPOSE 3000