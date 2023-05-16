package persistence

import (
	"errors"
	"net/http"
	"gorm.io/gorm"
	"myapp/entity"
)

type CreatePostPersistence struct{}

func NewCreatePostPersistence() *CreatePostPersistence {
	return &CreatePostPersistence{}
}

func (p CreatePostPersistence) CreatePost(
	ctx context.Context,
	gctx *gin.Context
	title string,
	body string
) err {
	if ctx.Request.Method != http.MethodGet {
		token, err := ctx.Cookie(entity.AuthCookieKey)
		if err != nil {
			return
		}
		user, err := userRepo.GetUserFromToken(ctx, token)
	}

	post := Post{
		ID: ,
		Title: title,
		Body: body,
		User: &user
	}
}
