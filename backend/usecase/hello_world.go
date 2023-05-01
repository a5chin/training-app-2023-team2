package usecase

import (
	"context"
	"myapp/entity"
)

type HelloWorldUseCase struct {
	HelloWorldRepo
}

func NewHelloWorldUseCase(repo HelloWorldRepo) *HelloWorldUseCase {
	return &HelloWorldUseCase{repo}
}

func (u HelloWorldUseCase) GetHelloWorld(ctx context.Context, lang string) (*entity.HelloWorld, error) {
	return u.HelloWorldRepo.GetHelloWorld(ctx, lang)
}
