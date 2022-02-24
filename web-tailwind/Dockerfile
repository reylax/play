FROM node:14 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
COPY env.p .env
RUN yarn build
RUN yarn export

FROM nginx:alpine
COPY --from=build /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf