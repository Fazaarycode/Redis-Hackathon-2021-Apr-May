FROM node:15.14.0-alpine

WORKDIR /usr/workspace/application

COPY package*.json ./

RUN npm install -g nodemon

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "nodemon","./src/index.js" ]
