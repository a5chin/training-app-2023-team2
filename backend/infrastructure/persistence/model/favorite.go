package model

import (
	"gorm.io/gorm"
)

type Favorite struct {
	UserID string
	PostID string
	gorm.Model
}
