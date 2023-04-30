FROM golang:1.20

RUN mkdir /go/src/myapp
WORKDIR /go/src/myapp

RUN go install github.com/cosmtrek/air@v1.43.0 \
    && go install github.com/swaggo/swag/cmd/swag@latest \
    && go install github.com/golang/mock/mockgen@latest