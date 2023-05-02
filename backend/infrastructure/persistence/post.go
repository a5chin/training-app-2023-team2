package persistence

import (
	"context"
	"gorm.io/gorm"
	"myapp/entity"
	"myapp/infrastructure/driver"
	"myapp/infrastructure/persistence/model"
)

type PostPersistence struct{}

func NewPostPersistence() *PostPersistence {
	return &PostPersistence{}
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
