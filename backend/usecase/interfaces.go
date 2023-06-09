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
	GetPosts(ctx context.Context, pid, loginUserID *string, limit, offset *int, userID *string) ([]*entity.Post, error)
	GetPostByID(ctx context.Context, loginUserID *string, pid string) (*entity.Post, error)
	CreatePost(ctx context.Context, parentID *string, uid, body string) error
	DeletePost(ctx context.Context, uid, pid string) error
}

type UserRepo interface {
	GetUsers(ctx context.Context) ([]*entity.User, error)
	GetUserByID(ctx context.Context, userID string) (*entity.User, error)
	UpdateProfile(ctx context.Context, userID, profile string) error
	CreateUser(ctx context.Context, name, email, password string) (*entity.User, error)
	GetUserFromEmail(ctx context.Context, email, password string) (*entity.User, error)
	GetUserFromToken(ctx context.Context, idToken string) (*entity.User, error)
	TokenizeUser(user *entity.User) (string, error)
}

type FavoriteRepo interface {
	CreateFavorite(ctx context.Context, uid, pid string) error
	DeleteFavorite(ctx context.Context, loginUserID, pid string) error
}
