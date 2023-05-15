package usecase

import "context"

type UserUseCase struct {
	UserRepo
}

func NewUserUseCase(repo UserRepo) *UserUseCase {
	return &UserUseCase{repo}
}

func (u UserUseCase) SignInUser(ctx context.Context, email, password string) (string, error) {
	return u.UserRepo.GetUserToken(ctx, email, password)
}

func (u UserUseCase) SignUpUser(ctx context.Context, name, email, password string) (string, error) {
	return u.UserRepo.CreateUserToken(ctx, name, email, password)
}
