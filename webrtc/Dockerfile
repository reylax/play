FROM node:14.17.1-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
CMD [ "node", "peer.js" ]