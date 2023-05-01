package persistence

import (
	"context"
	"errors"
	"gorm.io/gorm"
	"myapp/entity"
	"myapp/infrastructure/driver"
	"myapp/infrastructure/persistence/model"
	"net/http"
)

type HelloWorldPersistence struct{}

func NewHelloWorldPersistence() *HelloWorldPersistence {
	return &HelloWorldPersistence{}
}

func (p HelloWorldPersistence) GetHelloWorld(ctx context.Context, lang string) (*entity.HelloWorld, error) {
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
