FROM node:14.17.1-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
COPY env.p .env
CMD [ "node", "src/index.js" ]