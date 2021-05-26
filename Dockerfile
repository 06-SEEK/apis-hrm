FROM node:12-alpine

ENV NODE_ENV=production
ENV MONGO_URL mongodb://mongo:27017/test-api

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./


RUN yarn install

COPY . . 


EXPOSE 3000
CMD ["yarn", "start"]
