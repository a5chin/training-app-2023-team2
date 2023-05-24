package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"myapp/entity"
	"net/http"
)

type HelloWorldController struct {
	HelloWorldUseCase
}

func NewHelloWorldController(u HelloWorldUseCase) *HelloWorldController {
	return &HelloWorldController{u}
}

// GetHelloWorld godoc
//
//	@Summary		get helloWorld message
//	@Description	get helloWorld message
//	@Tags			HelloWorld
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	entity.HelloWorld
//	@Failure		400	{object}	entity.ErrorResponse
//	@Failure		404	{object}	entity.ErrorResponse
//	@Router			/hello [get]
func (c HelloWorldController) GetHelloWorld(ctx *gin.Context) (interface{}, error) {
	lang := ctx.DefaultQuery("lang", "ja")
	if len(lang) != 2 {
		return nil, entity.WrapError(http.StatusBadRequest, fmt.Errorf("invalid lang parameter: %s", lang))
	}
	helloWorld, err := c.HelloWorldUseCase.GetHelloWorld(ctx, lang)
	if err != nil {
		return nil, err
	}
	return helloWorld, nil
}
