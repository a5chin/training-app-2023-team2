package usecase

import (
	"context"
	"myapp/entity"
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

func (u FavoriteUseCase) GetFavorites(ctx context.Context, uid, pid string) (*entity.Favorite, error) {
	return u.FavoriteRepo.GetFavorites(ctx, uid, pid)
}
