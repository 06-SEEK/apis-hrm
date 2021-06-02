FROM node:12-alpine

ENV NODE_ENV=production
ENV MONGO_URL mongodb+srv://dbadmin:dbpassword@cluster0.c9agf.mongodb.net/hrmdb?retryWrites=true&w=majority

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

COPY ./default.env ./.env
RUN yarn install

COPY . . 


EXPOSE 3000

CMD ["node", "app"]
# CMD ["yarn", "start"]
