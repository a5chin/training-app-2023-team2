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

type PostPersistence struct{}

func NewPostPersistence() *PostPersistence {
	return &PostPersistence{}
}

func (p PostPersistence) CreatePost(
	ctx context.Context,
	uid string,
	body string,
) error {
	if err := db.Create(
		&model.Post{
			ID:     model.GenerateID.String(),
			Body:   body,
			UserID: uid,
		},
	).Error; err != nil {
		var mysqlErr *mysql.MySQLError
		if errors.As(err, &mysqlErr) && mysqlErr.Number == driver.ErrDuplicateEntryNumber {
			return nil, entity.WrapError(http.StatusConflict, err)
		}
		return err
	}
	return nil
}

func (p PostPersistence) GetPosts(
	ctx context.Context,
	limit *int,
	offset *int,
) ([]*entity.Post, error) {
	var records []*model.Post
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)
	if limit != nil {
		db = db.Limit(*limit)
	}
	if offset != nil {
		db = db.Offset(*offset)
	}
	if err := db.Preload("User").Order("posts.id DESC").Find(&records).Error; err != nil {
		return nil, err
	}
	var posts []*entity.Post
	for _, record := range records {
		posts = append(posts, record.ToEntity())
	}
	return posts, nil
}

func (p PostPersistence) GetPostByID(
	ctx context.Context,
	id int,
) (*entity.Post, error) {
	var record *model.Post
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)
	if err := db.Preload("User").First(&record, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, entity.WrapError(http.StatusNotFound, err)
		}
		return nil, err
	}

	return record.ToEntity(), nil
}
