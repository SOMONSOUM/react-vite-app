FROM node:16.4.0

RUN apk add --no-cache nano

WORKDIR /app

COPY . .

RUN yarn install --production

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "preview" ]