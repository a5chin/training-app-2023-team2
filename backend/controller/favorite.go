package controller

import "github.com/gin-gonic/gin"

type FavoriteController struct {
}

func NewFavoriteController() *FavoriteController {
	return &FavoriteController{}
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
	return GetPostsResponse{Posts: nil}, nil
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
