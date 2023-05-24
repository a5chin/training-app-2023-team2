package persistence

import (
	"context"
	"errors"
	"myapp/entity"
	"myapp/infrastructure/driver"
	"myapp/infrastructure/persistence/model"
	"net/http"

	"github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserPersistence struct {
	*driver.TokenDriver
}

func NewUserPersistence(tokenDriver *driver.TokenDriver) *UserPersistence {
	return &UserPersistence{tokenDriver}
}

func (p UserPersistence) GetUsers(ctx context.Context) ([]*entity.User, error) {
	var records []*model.User
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)
	if err := db.Find(&records).Error; err != nil {
		return nil, err
	}
	var users []*entity.User
	for _, record := range records {
		users = append(users, record.ToEntity())
	}
	return users, nil
}

func (p UserPersistence) GetUserByID(ctx context.Context, userID string) (*entity.User, error) {
	var user *model.User
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)
	if err := db.First(&user, "id = ?", userID).Error; err != nil {
		return nil, err
	}
	return user.ToEntity(), nil
}

func (p UserPersistence) UpdateProfile(ctx context.Context, userID, profile string) error {
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)
	var user *model.User
	if err := db.First(&user, "id = ?", userID).Error; err != nil {
		return err
	}
	user.Profile = profile
	if err := db.Save(user).Error; err != nil {
		var mysqlErr *mysql.MySQLError
		if errors.As(err, &mysqlErr) && mysqlErr.Number == driver.ErrDuplicateEntryNumber {
			return entity.WrapError(http.StatusConflict, err)
		}
		return err
	}
	return nil
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

func (p UserPersistence) GetUserFromEmail(ctx context.Context, email, password string) (*entity.User, error) {
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)
	var record *model.User
	if err := db.Where("email = ?", email).First(&record).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, entity.WrapError(http.StatusNotFound, err)
		}
		return nil, err
	}
	if err := bcrypt.CompareHashAndPassword([]byte(record.Password), []byte(password)); err != nil {
		return nil, entity.WrapError(http.StatusUnauthorized, err)
	}
	return record.ToEntity(), nil
}

func (p UserPersistence) CreateUser(ctx context.Context, name, email, password string) (*entity.User, error) {
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}
	user := &model.User{
		ID:       model.GenerateID().String(),
		Name:     name,
		Password: string(hash),
		Profile:  "",
		Email:    email,
	}
	if err := db.Create(user).Error; err != nil {
		var mysqlErr *mysql.MySQLError
		if errors.As(err, &mysqlErr) && mysqlErr.Number == driver.ErrDuplicateEntryNumber {
			return nil, entity.WrapError(http.StatusConflict, err)
		}
		return nil, err
	}
	return user.ToEntity(), err
}

func (p UserPersistence) TokenizeUser(user *entity.User) (string, error) {
	return p.TokenDriver.EncodeJwt(user)
}
