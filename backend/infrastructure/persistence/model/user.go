package model

import (
	"myapp/entity"

	"gorm.io/gorm"
)

type User struct {
	ID       string
	Name     string
	Email    string
	Password string
	gorm.Model
}

func (m User) ToEntity() *entity.User {
	return &entity.User{
		ID:    m.ID,
		Email: m.Email,
		Name:  m.Name,
		//Password: m.Password,
	}
}
