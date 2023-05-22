package middleware

import (
	"context"
	"myapp/entity"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserRepo interface {
	GetUserFromToken(ctx context.Context, idToken string) (*entity.User, error)
}

func Authentication(userRepo UserRepo) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		isGet := ctx.Request.Method == http.MethodGet
		token, err := ctx.Cookie(entity.AuthCookieKey)
		if err != nil && !isGet {
			ctx.AbortWithError(http.StatusUnauthorized, err)
			return
		}
		user, err := userRepo.GetUserFromToken(ctx, token)
		if err != nil && !isGet {
			ctx.AbortWithError(http.StatusUnauthorized, err)
			return
		}
		ctx.Set(entity.ContextAuthUserKey, user)
		ctx.Next()
	}
}
