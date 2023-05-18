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
	GetPosts(ctx context.Context, limit, offset *int) ([]*entity.Post, error)
	GetPostByID(ctx context.Context, pid string) (*entity.Post, error)
	CreatePost(ctx context.Context, uid, body string) error
	DeletePost(ctx context.Context, uid, pid string) error
	CreateReply(ctx context.Context, parentID, uid, body string) error
}

type UserUseCase interface {
	SignInUser(ctx context.Context, email, password string) (*entity.User, string, error)
	SignUpUser(ctx context.Context, name, email, password string) (*entity.User, string, error)
	GetUserFromToken(ctx context.Context, token string) (*entity.User, error)
}
