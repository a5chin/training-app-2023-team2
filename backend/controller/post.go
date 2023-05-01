package controller

import (
	"errors"
	"github.com/gin-gonic/gin"
	"myapp/entity"
	"net/http"
)

type PostController struct {
	PostUseCase
}

func NewPostController(u PostUseCase) *PostController {
	return &PostController{u}
}

type GetPostsQuery struct {
	Limit  *int `form:"limit,omitempty"`
	Offset *int `form:"offset,omitempty"`
}

type GetPostsResponse struct {
	Posts []*entity.Post `json:"posts"`
}

// GetPosts godoc
// @Summary		get posts
// @Description	get posts
// @Tags			Post
// @Accept			json
// @Produce		json
// @Param			limit	query		string	false	"limit"
// @Param			offset	query		string	false	"offset"
// @Success		200		{object}	GetPostsResponse
// @Failure		400		{object}	entity.ErrorResponse
// @Failure		404		{object}	entity.ErrorResponse
// @Router			/posts [get]
func (c PostController) GetPosts(ctx *gin.Context) (interface{}, error) {
	var query GetPostsQuery
	err := ctx.ShouldBind(&query)
	if err != nil {
		return nil, entity.WrapError(http.StatusBadRequest, err)
	}
	if query.Limit == nil && query.Offset != nil {
		return nil, entity.WrapError(http.StatusBadRequest, errors.New("can't use offset without limit"))
	}
	posts, err := c.PostUseCase.GetPosts(ctx, query.Limit, query.Offset)
	if err != nil {
		return nil, err
	}
	return GetPostsResponse{Posts: posts}, nil
}
