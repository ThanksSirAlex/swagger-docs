FROM node:latest

WORKDIR /mimir

COPY package.json yarn.lock ./

RUN yarn

COPY ./ ./

RUN yarn build

ENTRYPOINT [ "serve", "-s", "build" ]

