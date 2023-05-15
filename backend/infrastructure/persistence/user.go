package persistence

import (
	"context"
	"errors"
	"github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"myapp/entity"
	"myapp/infrastructure/driver"
	"myapp/infrastructure/persistence/model"
	"net/http"
)

type UserPersistence struct {
	*driver.TokenDriver
}

func NewUserPersistence(tokenDriver *driver.TokenDriver) *UserPersistence {
	return &UserPersistence{tokenDriver}
}

func (p UserPersistence) GetUserFromToken(ctx context.Context, idToken string) (*entity.User, error) {
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)
	user, err := p.TokenDriver.DecodeJwt(idToken)
	if err != nil {
		return nil, entity.WrapError(http.StatusUnauthorized, err)
	}
	var record *model.User
	if err := db.First(&record, "id = ?", user.ID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, entity.WrapError(http.StatusNotFound, err)
		}
		return nil, err
	}
	return record.ToEntity(), nil
}

func (p UserPersistence) GetUserToken(ctx context.Context, email, password string) (string, error) {
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)
	var record *model.User
	if err := db.Where("email = ?", email).First(&record).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return "", entity.WrapError(http.StatusNotFound, err)
		}
		return "", err
	}
	if err := bcrypt.CompareHashAndPassword([]byte(record.Password), []byte(password)); err != nil {
		return "", entity.WrapError(http.StatusUnauthorized, err)
	}
	return p.TokenDriver.EncodeJwt(record.ToEntity())
}

func (p UserPersistence) CreateUserToken(ctx context.Context, name, email, password string) (string, error) {
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	user := &model.User{
		ID:       model.GenerateID().String(),
		Name:     name,
		Password: string(hash),
		Email:    email,
	}
	if err := db.Create(user).Error; err != nil {
		var mysqlErr *mysql.MySQLError
		if errors.As(err, &mysqlErr) && mysqlErr.Number == driver.ErrDuplicateEntryNumber {
			return "", entity.WrapError(http.StatusConflict, err)
		}
		return "", err
	}
	a, err := p.TokenDriver.EncodeJwt(user.ToEntity())
	return a, err
}
