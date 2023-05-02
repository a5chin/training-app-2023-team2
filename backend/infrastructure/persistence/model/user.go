package model

import (
	"gorm.io/gorm"
	"myapp/entity"
)

type User struct {
	Name     string
	Password string
	gorm.Model
}

func (m User) ToEntity() *entity.User {
	return &entity.User{
		ID:   m.ID,
		Name: m.Name,
		//Password: m.Password,
	}
}
