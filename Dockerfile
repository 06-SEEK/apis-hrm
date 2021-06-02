FROM node:12-alpine                                                   

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

COPY ./default.env ./.env                         
RUN yarn install

COPY . . 

EXPOSE 3000

CMD ["node", "app"]
# CMD ["yarn", "start"]
