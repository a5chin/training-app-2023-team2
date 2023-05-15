package middleware

import (
	"context"
	"github.com/gin-gonic/gin"
	"myapp/entity"
)

type UserRepo interface {
	GetUserFromToken(ctx context.Context, idToken string) (*entity.User, error)
}

func Authentication(userRepo UserRepo) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		token, err := ctx.Cookie(entity.AuthCookieKey)
		if err != nil {
			return
		}
		user, err := userRepo.GetUserFromToken(ctx, token)
		if err != nil {
			return
		}
		ctx.Set(entity.ContextAuthUserKey, user)
		ctx.Next()
	}
}
