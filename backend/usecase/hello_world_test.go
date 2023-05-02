package usecase

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
	"myapp/entity"
	"net/http/httptest"
	"testing"
)

func TestHelloWorldUseCase_GetHelloWorld(t *testing.T) {
	tests := []struct {
		name    string
		lang    string
		message string
		err     bool
	}{
		{"should not an throw error / lang is en", "en", "Hello World", false},
		{"should not an throw error / lang is ja", "ja", "こんにちは 世界", false},
		{"should an throw error / lang is japanese", "japanese", "こんにちは 世界", false},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			ginCtx, _ := gin.CreateTestContext(httptest.NewRecorder())
			repo := getMockHelloWorldRepo(t)
			if test.err {
				repo.EXPECT().GetHelloWorld(gomock.Any(), gomock.Any()).Return(nil, errors.New("error")).AnyTimes()
				useCase := NewHelloWorldUseCase(repo)
				_, err := useCase.GetHelloWorld(ginCtx, test.lang)
				assert.Error(t, err)
			} else {
				repo.EXPECT().GetHelloWorld(gomock.Any(), gomock.Any()).Return(&entity.HelloWorld{
					Lang:    test.lang,
					Message: test.message,
				}, nil).AnyTimes()
				useCase := NewHelloWorldUseCase(repo)
				msg, err := useCase.GetHelloWorld(ginCtx, test.lang)
				assert.NoError(t, err)
				assert.Equal(t, msg, &entity.HelloWorld{
					Lang:    test.lang,
					Message: test.message,
				})
			}
		})
	}
}
