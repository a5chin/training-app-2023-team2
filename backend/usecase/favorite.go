package usecase

import (
	"context"
)

type FavoriteUseCase struct {
	FavoriteRepo
}

func NewFavoriteUseCase(repo FavoriteRepo) *FavoriteUseCase {
	return &FavoriteUseCase{repo}
}

func (u FavoriteUseCase) CreateFavorite(ctx context.Context, uid, pid string) error {
	return u.FavoriteRepo.CreateFavorite(ctx, uid, pid)
}

func (u FavoriteUseCase) DeleteFavorite(ctx context.Context, loginUserID, pid string) error {
	return u.FavoriteRepo.DeleteFavorite(ctx, loginUserID, pid)
}
