package usecase

import (
	"context"
	"myapp/entity"
)

type PostUseCase struct {
	PostRepo
}

func NewPostUseCase(repo PostRepo) *PostUseCase {
	return &PostUseCase{repo}
}

func (u PostUseCase) GetPosts(ctx context.Context, limit *int, offset *int) ([]*entity.Post, error) {
	return u.PostRepo.GetPosts(ctx, limit, offset)
}

func (u PostUseCase) GetPostByID(ctx context.Context, id int) (*entity.Post, error) {
	return u.PostRepo.GetPostByID(ctx, id)
}
