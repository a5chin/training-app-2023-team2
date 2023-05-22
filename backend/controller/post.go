package controller

import (
	"errors"
	"myapp/entity"
	"net/http"

	"github.com/gin-gonic/gin"
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
//
//	@Summary	投稿一覧取得API
//	@Description
//	@Tags		Post
//	@Accept		json
//	@Produce	json
//	@Param		limit	query		string	false	"limit"
//	@Param		offset	query		string	false	"offset"
//	@Success	200		{object}	GetPostsResponse
//	@Failure	400		{object}	entity.ErrorResponse
//	@Failure	404		{object}	entity.ErrorResponse
//	@Router		/posts [get]
func (c PostController) GetPosts(ctx *gin.Context) (interface{}, error) {
	var query GetPostsQuery
	err := ctx.ShouldBind(&query)
	if err != nil {
		return nil, entity.WrapError(http.StatusBadRequest, err)
	}
	_user, ok := ctx.Get(entity.ContextAuthUserKey)
	if !ok {
		return nil, entity.WrapError(http.StatusUnauthorized, errors.New("empty user"))
	}
	var userID *string
	user, _ := _user.(*entity.User)
	if user != nil {
		userID = &user.ID
	}
	if query.Limit == nil && query.Offset != nil {
		return nil, entity.WrapError(http.StatusBadRequest, errors.New("can't use offset without limit"))
	}
	posts, err := c.PostUseCase.GetPosts(ctx, userID, query.Limit, query.Offset)
	if err != nil {
		return nil, err
	}
	return GetPostsResponse{Posts: posts}, nil
}

// GetPostByID godoc
//
//	@Summary		投稿取得API
//	@Description	get post by id
//	@Tags			Post
//	@Accept			json
//
//	@Param			postId	path	string	true	"投稿ID"
//
//	@Produce		json
//	@Success		200	{object}	entity.Post
//	@Failure		400	{object}	entity.ErrorResponse
//	@Failure		404	{object}	entity.ErrorResponse
//	@Failure		500	{object}	entity.ErrorResponse
//	@Router			/posts/{postId} [get]
func (c PostController) GetPostByID(ctx *gin.Context) (interface{}, error) {
	pid := ctx.Param("postId")
	_user, ok := ctx.Get(entity.ContextAuthUserKey)
	if !ok {
		return nil, entity.WrapError(http.StatusUnauthorized, errors.New("empty user"))
	}
	var userID *string
	user, _ := _user.(*entity.User)
	if user != nil {
		userID = &user.ID
	}
	return c.PostUseCase.GetPostByID(ctx, userID, pid)
}

type CreatePostRequest struct {
	Content string `form:"content"`
}

// CreatePost godoc
//
//	@Summary	投稿作成API
//	@Description
//	@Tags		Post
//	@Accept		mpfd
//	@Produce	json
//	@Param		file	formData	file				false	"画像ファイル"
//	@Param		request	formData	CreatePostRequest	true	"投稿作成リクエスト"
//	@Success	200		"OK"
//	@Failure	400		{object}	entity.ErrorResponse
//	@Failure	401		{object}	entity.ErrorResponse
//	@Router		/posts [post]
func (c PostController) CreatePost(ctx *gin.Context) (interface{}, error) {
	var req *CreatePostRequest
	if err := ctx.Bind(&req); err != nil {
		return nil, entity.WrapError(http.StatusBadRequest, err)
	}
	_user, ok := ctx.Get(entity.ContextAuthUserKey)
	if !ok {
		return nil, entity.WrapError(http.StatusUnauthorized, errors.New("empty user"))
	}
	user, ok := _user.(*entity.User)
	if !ok {
		return nil, entity.WrapError(http.StatusUnauthorized, errors.New("_user is not entity user"))
	}
	return nil, c.PostUseCase.CreatePost(ctx, user.ID, req.Content)
}

// DeletePost godoc
//
//	@Summary	投稿削除API
//	@Description
//	@Tags		Post
//	@Accept		json
//	@Produce	json
//	@Param		postId	path	string	true	"投稿ID"
//	@Success	204		"NoContent"
//	@Failure	401		{object}	entity.ErrorResponse
//	@Failure	404		{object}	entity.ErrorResponse
//	@Router		/posts/{postId} [delete]
func (c PostController) DeletePost(ctx *gin.Context) (interface{}, error) {
	_user, ok := ctx.Get(entity.ContextAuthUserKey)
	if !ok {
		return nil, entity.WrapError(http.StatusUnauthorized, errors.New("empty user"))
	}
	user, ok := _user.(*entity.User)
	if !ok {
		return nil, entity.WrapError(http.StatusUnauthorized, errors.New("_user is not entity user"))
	}
	pid := ctx.Param("postId")
	return nil, c.PostUseCase.DeletePost(ctx, user.ID, pid)
}

// CreateReply godoc
//
//	@Summary	リプライ作成API
//	@Description
//	@Tags		Post
//	@Accept		mpfd
//	@Produce	json
//	@Param		postId	path		string				true	"投稿ID"
//	@Param		file	formData	file				false	"画像ファイル"
//	@Param		request	formData	CreatePostRequest	true	"投稿作成リクエスト"
//	@Success	200		"OK"
//	@Failure	400		{object}	entity.ErrorResponse
//	@Failure	401		{object}	entity.ErrorResponse
//	@Router		/posts/{postId}/replies [post]
func (c PostController) CreateReply(ctx *gin.Context) (interface{}, error) {
	var req *CreatePostRequest
	if err := ctx.Bind(&req); err != nil {
		return nil, entity.WrapError(http.StatusBadRequest, err)
	}
	pid := ctx.Param("postId")
	_user, ok := ctx.Get(entity.ContextAuthUserKey)
	if !ok {
		return nil, entity.WrapError(http.StatusUnauthorized, errors.New("empty user"))
	}
	user, ok := _user.(*entity.User)
	if !ok {
		return nil, entity.WrapError(http.StatusUnauthorized, errors.New("_user is not entity user"))
	}
	return nil, c.PostUseCase.CreateReply(ctx, pid, user.ID, req.Content)
}

// GetReplies godoc
//
//	@Summary	リプライ一覧取得API
//	@Description
//	@Tags		Post
//	@Accept		json
//	@Produce	json
//	@Param		postId	path		string	true	"投稿ID"
//	@Param		limit	query		string	false	"limit"
//	@Param		offset	query		string	false	"offset"
//	@Success	200		{object}	GetPostsResponse
//	@Failure	404		{object}	entity.ErrorResponse
//	@Router		/posts/{postId}/replies [get]
func (c PostController) GetReplies(ctx *gin.Context) (interface{}, error) {
	var query GetPostsQuery
	err := ctx.ShouldBind(&query)
	pid := ctx.Param("postId")
	if err != nil {
		return nil, entity.WrapError(http.StatusBadRequest, err)
	}
	_user, ok := ctx.Get(entity.ContextAuthUserKey)
	if !ok {
		return nil, entity.WrapError(http.StatusUnauthorized, errors.New("empty user"))
	}
	var userID *string
	user, _ := _user.(*entity.User)
	if user != nil {
		userID = &user.ID
	}
	if query.Limit == nil && query.Offset != nil {
		return nil, entity.WrapError(http.StatusBadRequest, errors.New("can't use offset without limit"))
	}
	posts, err := c.PostUseCase.GetReplies(ctx, userID, pid, query.Limit, query.Offset)
	if err != nil {
		return nil, err
	}
	return GetPostsResponse{Posts: posts}, nil
}
