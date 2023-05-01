package controller

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
	"myapp/entity"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHelloWorldController_GetHelloWorld(t *testing.T) {
	tests := []struct {
		name          string
		lang          string
		message       string
		err           bool
		validateError bool
	}{
		{"should not an throw error / lang is en", "en", "Hello World", false, false},
		{"should not an throw error / lang is ja", "ja", "こんにちは 世界", false, false},
		{"should an throw error / lang is fr", "fr", "Bonjour le monde", true, false},
		{"should an throw error / lang is japanese", "japanese", "こんにちは 世界", false, true},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			ginCtx, _ := gin.CreateTestContext(httptest.NewRecorder())
			req, _ := http.NewRequest("GET", fmt.Sprintf("/?lang=%s", test.lang), nil)
			ginCtx.Request = req
			useCase := getMockHelloWorldUseCase(t)
			if test.err {
				useCase.EXPECT().GetHelloWorld(gomock.Any(), gomock.Any()).Return(nil, errors.New("error")).AnyTimes()
				ctrl := NewHelloWorldController(useCase)
				_, err := ctrl.GetHelloWorld(ginCtx)
				assert.Error(t, err)
			} else {
				useCase.EXPECT().GetHelloWorld(gomock.Any(), gomock.Any()).Return(&entity.HelloWorld{
					Lang:    test.lang,
					Message: test.message,
				}, nil).AnyTimes()
				ctrl := NewHelloWorldController(useCase)
				msg, err := ctrl.GetHelloWorld(ginCtx)
				if test.validateError {
					assert.Error(t, err)
				} else {
					assert.NoError(t, err)
					assert.Equal(t, msg, &entity.HelloWorld{
						Lang:    test.lang,
						Message: test.message,
					})
				}
			}
		})
	}
}
