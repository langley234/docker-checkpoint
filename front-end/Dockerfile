FROM node:12.16.1-buster-slim

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install

EXPOSE 3000

CMD [ "npm", "start" ]