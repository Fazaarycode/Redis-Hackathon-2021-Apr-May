# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /usr/frontend/application

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/frontend/application/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]