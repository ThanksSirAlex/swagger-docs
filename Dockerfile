FROM node:latest

WORKDIR /mimir

COPY package.json yarn.lock ./

RUN yarn && yarn global add serve

COPY ./ ./

RUN yarn build

ENTRYPOINT [ "serve", "-s", "build" ]

