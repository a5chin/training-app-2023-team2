package controller

import (
	"errors"
	"strconv"
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

// GetPostByID godoc
// @Summary		get post by id
// @Description	get post by id
// @Tags			Post
// @Accept			json
// @Param        id   path      int  true  "Post ID"
// @Produce		json
// @Success		200		{object}	entity.Post
// @Failure		400		{object}	entity.ErrorResponse
// @Failure		404		{object}	entity.ErrorResponse
// @Failure		500		{object}	entity.ErrorResponse
// @Router			/posts/{id} [get]
func (c PostController) GetPostByID(ctx *gin.Context) (interface{}, error) {
	strId := ctx.Param("id")
	id, err := strconv.Atoi(strId)
	if err != nil {
		return nil, entity.WrapError(http.StatusBadRequest, err)
	}

	return c.PostUseCase.GetPostByID(ctx, id)
}
