package model

import (
	"gorm.io/gorm"
	"myapp/entity"
)

type Post struct {
	ID       string
	Body     string
	UserID   string
	User     *User
	ParentID *string
	Parent   *Post
	gorm.Model
}

func (m Post) ToEntity() *entity.Post {
	var user *entity.User
	var parent *entity.Post
	if m.User != nil {
		user = m.User.ToEntity()
	}
	if m.Parent != nil {
		parent = m.Parent.ToEntity()
	}
	return &entity.Post{
		ID:     m.ID,
		Body:   m.Body,
		User:   user,
		Parent: parent,
	}
}
