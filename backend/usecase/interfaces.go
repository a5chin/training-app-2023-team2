package usecase

//go:generate go run github.com/golang/mock/mockgen -source=$GOFILE -destination=./mock.go -package=$GOPACKAGE

import (
	"context"
	"myapp/entity"
)

type HelloWorldRepo interface {
	GetHelloWorld(ctx context.Context, lang string) (*entity.HelloWorld, error)
}

type PostRepo interface {
	GetPosts(ctx context.Context, limit *int, offset *int) ([]*entity.Post, error)
}

type UserRepo interface{}
