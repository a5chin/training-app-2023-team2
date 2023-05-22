package persistence

import (
	"context"
	"errors"
	"myapp/entity"
	"myapp/infrastructure/driver"
	"myapp/infrastructure/persistence/model"
	"net/http"

	"github.com/go-sql-driver/mysql"
	"gorm.io/gorm"
)

type FavoritePersistence struct{}

func NewFavoritePersistence() *FavoritePersistence {
	return &FavoritePersistence{}
}

func (p FavoritePersistence) CreateFavorite(
	ctx context.Context,
	uid,
	pid string,
) error {
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)
	if err := db.Create(
		&model.Favorite{
			UserID: uid,
			PostID: pid,
		},
	).Error; err != nil {
		var mysqlErr *mysql.MySQLError
		if errors.As(err, &mysqlErr) && mysqlErr.Number == driver.ErrDuplicateEntryNumber {
			return entity.WrapError(http.StatusConflict, err)
		}
		return err
	}
	return nil
}

func (p FavoritePersistence) DeleteFavorite(ctx context.Context, loginUserID, pid string) error {
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)

	if err := db.Where(
		"user_id = ? and post_id = ?", loginUserID, pid,
	).First(&model.Favorite{}).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return entity.WrapError(http.StatusNotFound, err)
		}
		return err
	}
	if err := db.Delete(
		&model.Favorite{}, "user_id = ? and post_id = ?", loginUserID, pid,
	).Error; err != nil {
		return err
	}
	return nil
}
