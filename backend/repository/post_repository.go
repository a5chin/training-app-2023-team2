package repository

import (
	"context"
	"gorm.io/gorm"
	"myapp/driver"
	"myapp/entity"
	"myapp/repository/model"
)

type PostRepository struct{}

func NewPostRepository() *PostRepository {
	return &PostRepository{}
}

func (r PostRepository) GetPosts(
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
	if err := db.Order("posts.created_at DESC").Find(&records).Error; err != nil {
		return nil, err
	}
	var posts []*entity.Post
	for _, record := range records {
		posts = append(posts, record.ToEntity())
	}
	return posts, nil
}
