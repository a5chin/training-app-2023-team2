package usecase

import (
	"errors"
	"myapp/entity"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
)

func TestPostUseCase_GetPosts(t *testing.T) {
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
		expected := stubPosts
		var length *int
		var offset *int
		if test.queryExist {
			length = &test.limit
			offset = &test.offset
			expected = stubPosts[test.offset:test.limit]
		}
		t.Run(test.name, func(t *testing.T) {
			ginCtx, _ := gin.CreateTestContext(httptest.NewRecorder())
			// mock作成
			repo := getMockPostRepo(t)
			if test.err != nil {
				// mockのメソッドをspyしておく
				repo.EXPECT().
					GetPosts(gomock.Any(), nil, nil, length, offset).
					Return(nil, test.err).AnyTimes()
				useCase := NewPostUseCase(repo)
				_, err := useCase.GetPosts(ginCtx, nil, length, offset)
				assert.Error(t, err)
			} else {
				repo.EXPECT().
					GetPosts(gomock.Any(), nil, nil, length, offset).
					Return(expected, nil).AnyTimes()
				postCtrl := NewPostUseCase(repo)
				posts, err := postCtrl.GetPosts(ginCtx, nil, length, offset)
				assert.NoError(t, err)
				assert.Equal(t, expected, posts)
			}
		})
	}
}

func TestPostUseCase_GetPostByID(t *testing.T) {
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
		expected := stubPosts[0]
		if test.queryExist {
			expected = stubPosts[0]
		}
		t.Run(test.name, func(t *testing.T) {
			ginCtx, _ := gin.CreateTestContext(httptest.NewRecorder())
			// mock作成
			repo := getMockPostRepo(t)
			if test.err != nil {
				// mockのメソッドをspyしておく
				repo.EXPECT().
					GetPostByID(gomock.Any(), nil, "1").
					Return(nil, test.err).AnyTimes()
				useCase := NewPostUseCase(repo)
				_, err := useCase.GetPostByID(ginCtx, nil, "1")
				assert.Error(t, err)
			} else {
				repo.EXPECT().
					GetPostByID(gomock.Any(), nil, "1").
					Return(expected, nil).AnyTimes()
				postCtrl := NewPostUseCase(repo)
				posts, err := postCtrl.GetPostByID(ginCtx, nil, "1")
				assert.NoError(t, err)
				assert.Equal(t, expected, posts)
			}
		})
	}
}
