FROM node:12.16.1-buster-slim

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

ENV POSTGRES_PASSWORD docker

RUN yarn install

EXPOSE 8080

CMD [ "npm", "start" ]