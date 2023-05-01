package model

import "myapp/entity"

type HelloWorld struct {
	Lang    string
	Message string
}

func (m HelloWorld) ToEntity() *entity.HelloWorld {
	return &entity.HelloWorld{
		Lang:    m.Lang,
		Message: m.Message,
	}
}
