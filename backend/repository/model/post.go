package model

import (
	"gorm.io/gorm"
	"myapp/entity"
)

type Post struct {
	Title  string
	Body   string
	UserID uint
	gorm.Model
}

func (m Post) ToEntity() *entity.Post {
	return &entity.Post{
		ID:    m.ID,
		Title: m.Title,
		Body:  m.Body,
	}
}
