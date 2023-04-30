package repository

import (
	"context"
	"errors"
	"gorm.io/gorm"
	"myapp/driver"
	"myapp/entity"
	"myapp/repository/model"
	"net/http"
)

type HelloWorldRepository struct{}

func NewHelloWorldRepository() *HelloWorldRepository {
	return &HelloWorldRepository{}
}

func (r HelloWorldRepository) GetHelloWorld(ctx context.Context, lang string) (*entity.HelloWorld, error) {
	var obj model.HelloWorld
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)
	err := db.Where("lang = ?", lang).First(&obj).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, entity.WrapError(http.StatusNotFound, err)
		}
		return nil, err
	}
	return obj.ToEntity(), nil
}
