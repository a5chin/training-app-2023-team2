package middleware

import (
	"context"
	"github.com/gin-gonic/gin"
	"myapp/entity"
	"net/http"
)

type UserRepo interface {
	GetUserFromToken(ctx context.Context, idToken string) (*entity.User, error)
}

func Authentication(userRepo UserRepo) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		if ctx.Request.Method != http.MethodGet {
			token, err := ctx.Cookie(entity.AuthCookieKey)
			if err != nil {
				ctx.AbortWithError(http.StatusUnauthorized, err)
				return
			}
			user, err := userRepo.GetUserFromToken(ctx, token)
			if err != nil {
				ctx.AbortWithError(http.StatusUnauthorized, err)
				return
			}
			ctx.Set(entity.ContextAuthUserKey, user)
		}
		ctx.Next()
	}
}
