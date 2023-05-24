package model

import (
	"myapp/entity"

	"gorm.io/gorm"
)

type Post struct {
	ID        string
	Body      string
	UserID    string
	User      *User
	ParentID  *string
	Parent    *Post
	Favorites []*Favorite
	Posts     []*Post `gorm:"foreignKey:ParentID"`
	gorm.Model
}

func (m Post) ToEntity(loginUserID *string) *entity.Post {
	var user *entity.User
	var parent *entity.Post
	var favoritesCount int64
	var repliesCount int64
	isMyFavorite := false
	if m.User != nil {
		user = m.User.ToEntity()
	}
	if m.Parent != nil {
		parent = m.Parent.ToEntity(loginUserID)
	}
	if m.Favorites != nil {
		favoritesCount = int64(len(m.Favorites))
		for _, fav := range m.Favorites {
			if fav != nil && loginUserID != nil && fav.UserID == *loginUserID {
				isMyFavorite = true
			}
		}
	}
	if m.Posts != nil {
		repliesCount = int64(len(m.Posts))
	}
	return &entity.Post{
		ID:             m.ID,
		Body:           m.Body,
		User:           user,
		Parent:         parent,
		FavoritesCount: favoritesCount,
		IsMyFavorite:   isMyFavorite,
		RepliesCount:   repliesCount,
	}
}
