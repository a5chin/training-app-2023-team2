package model

import (
	"myapp/entity"

	"gorm.io/gorm"
)

type User struct {
	ID       string
	Name     string
	Email    string
	Profile  string
	Password string
	gorm.Model
}

func (m User) ToEntity() *entity.User {
	return &entity.User{
		ID:      m.ID,
		Email:   m.Email,
		Name:    m.Name,
		Profile: m.Profile,
		//Password: m.Password,
	}
}
