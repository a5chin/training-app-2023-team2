package usecase

import (
	"context"
	"myapp/entity"
)

type UserUseCase struct {
	UserRepo
}

func NewUserUseCase(repo UserRepo) *UserUseCase {
	return &UserUseCase{repo}
}

func (u UserUseCase) SignInUser(ctx context.Context, email, password string) (*entity.User, string, error) {
	user, err := u.UserRepo.GetUserFromEmail(ctx, email, password)
	if err != nil {
		return nil, "", err
	}
	token, err := u.UserRepo.TokenizeUser(user)
	if err != nil {
		return nil, "", err
	}
	return user, token, nil
}

func (u UserUseCase) SignUpUser(ctx context.Context, name, email, password string) (*entity.User, string, error) {
	user, err := u.UserRepo.CreateUser(ctx, name, email, password)
	if err != nil {
		return nil, "", err
	}
	token, err := u.UserRepo.TokenizeUser(user)
	if err != nil {
		return nil, "", err
	}
	return user, token, nil
}

func (u UserUseCase) GetUserFromToken(ctx context.Context, token string) (*entity.User, error) {
	return u.UserRepo.GetUserFromToken(ctx, token)
}
