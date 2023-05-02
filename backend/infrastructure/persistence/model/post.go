package model

import (
	"gorm.io/gorm"
	"myapp/entity"
)

type Post struct {
	Title  string
	Body   string
	UserID uint
	User   *User
	gorm.Model
}

func (m Post) ToEntity() *entity.Post {
	var user *entity.User
	if m.User != nil {
		user = m.User.ToEntity()
	}
	return &entity.Post{
		ID:    m.ID,
		Title: m.Title,
		Body:  m.Body,
		User:  user,
	}
}
