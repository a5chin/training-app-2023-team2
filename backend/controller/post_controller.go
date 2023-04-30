package controller

import (
	"github.com/gin-gonic/gin"
	"myapp/entity"
	"net/http"
)

type PostController struct {
	PostRepo
}

func NewPostController(repo PostRepo) *PostController {
	return &PostController{repo}
}

type GetPostsQuery struct {
	Limit  *int `form:"limit,omitempty"`
	Offset *int `form:"offset,omitempty"`
}

// GetPosts godoc
// @Summary		get posts
// @Description	get posts
// @Tags			Post
// @Accept			json
// @Produce		json
// @Param			limit	query		string	false	"limit"
// @Param			offset	query		string	false	"offset"
// @Success		200		{object}	[]entity.Post
// @Failure		400		{object}	entity.ErrorResponse
// @Failure		404		{object}	entity.ErrorResponse
// @Router			/posts [get]
func (c PostController) GetPosts(ctx *gin.Context) (interface{}, error) {
	var query GetPostsQuery
	err := ctx.ShouldBind(&query)
	if err != nil {
		return nil, entity.WrapError(http.StatusBadRequest, err)
	}
	posts, err := c.PostRepo.GetPosts(ctx, query.Limit, query.Offset)
	if err != nil {
		return nil, err
	}
	return posts, nil
}
