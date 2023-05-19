package controller

import (
	"errors"
	"myapp/entity"
	"net/http"

	"github.com/gin-gonic/gin"
)

type FavoriteController struct {
	FavoriteUseCase
}

func NewFavoriteController(u FavoriteUseCase) *FavoriteController {
	return &FavoriteController{u}
}

// CreateFavorite godoc
//
//	@Summary	いいね作成API
//	@Description
//	@Tags		Favorite
//	@Accept		json
//	@Produce	json
//	@Param		postId	path	string	true	"投稿ID"
//	@Success	201		"Created"
//	@Failure	401		{object}	entity.ErrorResponse
//	@Failure	404		{object}	entity.ErrorResponse
//	@Router		/posts/{postId}/favorites [post]
func (c FavoriteController) CreateFavorite(ctx *gin.Context) (interface{}, error) {
	pid := ctx.Param("postId")
	_user, ok := ctx.Get(entity.ContextAuthUserKey)
	if !ok {
		return nil, entity.WrapError(http.StatusUnauthorized, errors.New("empty user"))
	}
	user, ok := _user.(*entity.User)
	if !ok {
		return nil, entity.WrapError(http.StatusUnauthorized, errors.New("_user is not entity user"))
	}
	return nil, c.FavoriteUseCase.CreateFavorite(ctx, pid, user.ID)
}

// DeleteFavorite godoc
//
//	@Summary	いいね削除API
//	@Description
//	@Tags		Favorite
//	@Accept		json
//	@Produce	json
//	@Param		postId		path	string	true	"投稿ID"
//	@Param		favoriteId	path	string	true	"いいねID"
//	@Success	201			"Created"
//	@Failure	401			{object}	entity.ErrorResponse
//	@Failure	404			{object}	entity.ErrorResponse
//	@Router		/posts/{postId}/favorites/{favoriteId} [delete]
func (c FavoriteController) DeleteFavorite(ctx *gin.Context) (interface{}, error) {
	return GetPostsResponse{Posts: nil}, nil
}
