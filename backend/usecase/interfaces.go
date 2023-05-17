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
	GetPostByID(
		ctx context.Context,
		id int,
	) (*entity.Post, error)
	CreatePost(
		ctx context.Context,
		uid string,
		body string,
	) error
}

type UserRepo interface {
	CreateUser(ctx context.Context, name, email, password string) (*entity.User, error)
	GetUserFromEmail(ctx context.Context, email, password string) (*entity.User, error)
	GetUserFromToken(ctx context.Context, idToken string) (*entity.User, error)
	TokenizeUser(user *entity.User) (string, error)
}
