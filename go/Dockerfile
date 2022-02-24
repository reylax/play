FROM golang:1.17-alpine AS build

ENV CGO_ENABLED 0
ENV GOOS linux
ENV GOPROXY https://goproxy.cn,direct

WORKDIR /app
# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .
RUN go build -o out

FROM alpine
ENV GOOS linux
WORKDIR /app
COPY --from=build /app/out out
COPY .env .env
CMD ["./out"]