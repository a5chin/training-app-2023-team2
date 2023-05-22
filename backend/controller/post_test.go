package controller

import (
	"errors"
	"fmt"
	"myapp/entity"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
)

func TestPostController_GetPosts(t *testing.T) {
	stubPosts := []*entity.Post{
		{
			ID:   "1",
			Body: "a",
		},
		{
			ID:   "2",
			Body: "b",
		},
		{
			ID:   "3",
			Body: "c",
		},
	}
	tests := []struct {
		name       string
		limit      int
		offset     int
		queryExist bool
		err        error
	}{
		{
			name:       "should not throw an error / posts length is 1",
			limit:      1,
			offset:     0,
			queryExist: true,
			err:        nil,
		},
		{
			name:       "should not throw an error / posts length is 1, offset is 1",
			limit:      2,
			offset:     1,
			queryExist: true,
			err:        nil,
		},
		{
			name:       "should not throw an error / posts length is 0",
			limit:      0,
			offset:     0,
			queryExist: true,
			err:        nil,
		},
		{
			name:       "should not throw an error / posts length is 1",
			limit:      1,
			offset:     0,
			queryExist: true,
			err:        nil,
		},
		{
			name:       "should throw an error",
			queryExist: false,
			err:        errors.New("error"),
		},
	}
	for _, test := range tests {
		// query string の組み立て
		path := "/posts"
		expected := stubPosts
		var length *int
		var offset *int
		if test.queryExist {
			length = &test.limit
			offset = &test.offset
			expected = stubPosts[test.offset:test.limit]
			path = fmt.Sprintf("%s?limit=%d&offset=%d", path, test.limit, test.offset)
		}
		t.Run(test.name, func(t *testing.T) {
			ginCtx, _ := gin.CreateTestContext(httptest.NewRecorder())
			req, _ := http.NewRequest("GET", path, nil)
			ginCtx.Request = req
			ginCtx.Set(entity.ContextAuthUserKey, nil)
			// mock作成
			useCase := getMockPostUseCase(t)
			if test.err != nil {
				// mockのメソッドをspyしておく
				useCase.EXPECT().
					GetPosts(gomock.Any(), nil, length, offset).
					Return(nil, test.err).AnyTimes()
				postCtrl := NewPostController(useCase)
				_, err := postCtrl.GetPosts(ginCtx)
				assert.Error(t, err)
			} else {
				useCase.EXPECT().
					GetPosts(gomock.Any(), nil, length, offset).
					Return(expected, nil).AnyTimes()
				postCtrl := NewPostController(useCase)
				posts, err := postCtrl.GetPosts(ginCtx)
				assert.NoError(t, err)
				assert.Equal(t, GetPostsResponse{Posts: expected}, posts)
			}
		})
	}
}

func TestPostController_GetPostByID(t *testing.T) {
	stubPosts := []*entity.Post{
		{
			ID:   "1",
			Body: "a",
		},
		{
			ID:   "2",
			Body: "b",
		},
		{
			ID:   "3",
			Body: "c",
		},
	}
	tests := []struct {
		name       string
		queryExist bool
		err        error
	}{
		{
			name:       "should not throw an error / posts length is 1",
			queryExist: true,
			err:        nil,
		},
		{
			name:       "should not throw an error / posts length is 1, offset is 1",
			queryExist: true,
			err:        nil,
		},
		{
			name:       "should not throw an error / posts length is 0",
			queryExist: true,
			err:        nil,
		},
		{
			name:       "should not throw an error / posts length is 1",
			queryExist: true,
			err:        nil,
		},
		{
			name:       "should throw an error",
			queryExist: false,
			err:        errors.New("error"),
		},
	}
	for _, test := range tests {
		// query string の組み立て
		path := "/posts/1"
		expected := stubPosts[0]

		if test.queryExist {
			expected = stubPosts[0]
		}
		t.Run(test.name, func(t *testing.T) {
			ginCtx, _ := gin.CreateTestContext(httptest.NewRecorder())
			req, _ := http.NewRequest("GET", path, nil)
			ginCtx.Request = req
			ginCtx.Params = []gin.Param{
				{
					Key:   "id",
					Value: "1",
				},
			}
			ginCtx.Set(entity.ContextAuthUserKey, nil)

			// mock作成
			useCase := getMockPostUseCase(t)
			if test.err != nil {
				// mockのメソッドをspyしておく
				useCase.EXPECT().
					GetPostByID(gomock.Any(), nil, gomock.Any()).
					Return(nil, test.err).AnyTimes()
				postCtrl := NewPostController(useCase)
				_, err := postCtrl.GetPostByID(ginCtx)
				assert.Error(t, err)
			} else {
				useCase.EXPECT().
					GetPostByID(gomock.Any(), gomock.Any(), gomock.Any()).
					Return(expected, nil).AnyTimes()
				postCtrl := NewPostController(useCase)
				posts, err := postCtrl.GetPostByID(ginCtx)
				assert.NoError(t, err)
				assert.Equal(t, expected, posts)
			}
		})
	}
}
