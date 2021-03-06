FROM node:12-alpine

ENV NODE_ENV=production
ENV DB_URL mongodb+srv://dbadmin:dbpassword@cluster0.c9agf.mongodb.net/hrmdb?retryWrites=true&w=majority
ENV DB_TEST mongodb+srv://dbadmin:dbpassword@cluster0.c9agf.mongodb.net/hrmdb-test?retryWrites=true&w=majority

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

COPY ./default.env ./.env                         
RUN yarn install

COPY . . 
RUN yarn test

EXPOSE 3000

CMD ["node", "index"]
# CMD ["yarn", "start"]
