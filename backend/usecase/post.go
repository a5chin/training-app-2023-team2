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

func (u PostUseCase) GetPosts(ctx context.Context, limit, offset *int) ([]*entity.Post, error) {
	return u.PostRepo.GetPosts(ctx, nil, limit, offset)
}

func (u PostUseCase) GetPostByID(ctx context.Context, pid string) (*entity.Post, error) {
	return u.PostRepo.GetPostByID(ctx, pid)
}

func (u PostUseCase) CreatePost(ctx context.Context, uid, body string) error {
	return u.PostRepo.CreatePost(ctx, nil, uid, body)
}

func (u PostUseCase) DeletePost(ctx context.Context, uid, pid string) error {
	return u.PostRepo.DeletePost(ctx, uid, pid)
}

func (u PostUseCase) CreateReply(ctx context.Context, parentID, uid, body string) error {
	return u.PostRepo.CreatePost(ctx, &parentID, uid, body)
}

func (u PostUseCase) GetReplies(ctx context.Context, pid string, limit, offset *int) ([]*entity.Post, error) {
	return u.PostRepo.GetPosts(ctx, &pid, limit, offset)
}
