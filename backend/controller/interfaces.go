package controller

//go:generate go run github.com/golang/mock/mockgen -source=$GOFILE -destination=./mock.go -package=$GOPACKAGE

import (
	"context"
	"myapp/entity"
)

type HelloWorldUseCase interface {
	GetHelloWorld(ctx context.Context, lang string) (*entity.HelloWorld, error)
}

type PostUseCase interface {
	GetPosts(ctx context.Context, limit *int, offset *int) ([]*entity.Post, error)
	GetPostByID(ctx context.Context, id int) (*entity.Post, error)
}

type UserUseCase interface {
	SignInUser(ctx context.Context, email, password string) (string, error)
	SignUpUser(ctx context.Context, name, email, password string) (string, error)
}
