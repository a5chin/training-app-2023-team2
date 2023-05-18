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

func (u PostUseCase) GetPostByID(ctx context.Context, pid string) (*entity.Post, error) {
	return u.PostRepo.GetPostByID(ctx, pid)
}

func (u PostUseCase) CreatePost(
	ctx context.Context,
	uid string,
	body string,
) error {
	return u.PostRepo.CreatePost(ctx, uid, body)
}

func (u PostUseCase) DeletePost(
	ctx context.Context,
	uid string,
	pid string,
) error {
	return u.PostRepo.DeletePost(ctx, uid, pid)
}
