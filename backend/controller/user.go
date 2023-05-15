package controller

import (
	"github.com/gin-gonic/gin"
	"myapp/entity"
	"net/http"
)

type UserController struct {
	UserUseCase
}

func NewUserController(u UserUseCase) *UserController {
	return &UserController{u}
}

// GetMe godoc
//
//	@Summary	ログインユーザー取得API
//	@Description
//	@Tags		Post
//	@Accept		json
//	@Produce	json
//	@Success	200	{object}	entity.User	"OK"
//	@Failure	401	{object}	entity.ErrorResponse
//	@Failure	404	{object}	entity.ErrorResponse
//	@Router		/users/me [get]
func (c UserController) GetMe(ctx *gin.Context) (interface{}, error) {
	return nil, nil
}

type SignUpRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignInRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// SignUp godoc
//
//	@Summary	ユーザー登録API
//	@Description
//	@Tags		Post
//	@Accept		json
//	@Param		request	body	SignUpRequest	true	"ユーザー登録リクエスト"
//	@Produce	json
//	@Success	200	"OK"
//	@Failure	400	{object}	entity.ErrorResponse
//	@Failure	409	{object}	entity.ErrorResponse
//	@Router		/sign_up [post]
func (c UserController) SignUp(ctx *gin.Context) (interface{}, error) {
	var req *SignUpRequest
	err := ctx.Bind(&req)
	if err != nil {
		return nil, entity.WrapError(http.StatusBadRequest, err)
	}
	token, err := c.UserUseCase.SignUpUser(ctx, req.Name, req.Email, req.Password)
	if err != nil {
		return nil, err
	}
	ctx.SetCookie(entity.AuthCookieKey, token, 3600, "/", "localhost", false, true)
	return nil, nil
}

// SignIn godoc
//
//	@Summary	ユーザーログインAPI
//	@Description
//	@Tags		Post
//	@Accept		json
//	@Param		request	body	SignInRequest	true	"ユーザーログインリクエスト"
//	@Produce	json
//	@Success	200	"OK"
//	@Failure	400	{object}	entity.ErrorResponse
//	@Failure	401	{object}	entity.ErrorResponse
//	@Failure	404	{object}	entity.ErrorResponse
//	@Failure	409	{object}	entity.ErrorResponse
//	@Router		/sign_in [post]
func (c UserController) SignIn(ctx *gin.Context) (interface{}, error) {
	var req *SignInRequest
	err := ctx.Bind(&req)
	if err != nil {
		return nil, entity.WrapError(http.StatusBadRequest, err)
	}
	token, err := c.UserUseCase.SignInUser(ctx, req.Email, req.Password)
	if err != nil {
		return nil, err
	}
	ctx.SetCookie(entity.AuthCookieKey, token, 3600, "/", "localhost", false, true)
	return nil, nil
}
