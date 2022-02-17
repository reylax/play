FROM node:14.17.1-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
CMD [ "node", "src/index.js" ]