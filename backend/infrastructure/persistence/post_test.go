package persistence

import (
	"context"
	"errors"
	"myapp/entity"
	"myapp/infrastructure/driver"
	"regexp"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
)

func TestPostPersistence_GetPosts(t *testing.T) {
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
		name     string
		wantErr  bool
		expected []*entity.Post
	}{
		{
			name:     "should not throw an error",
			wantErr:  false,
			expected: stubPosts,
		},
		{
			name:     "should not throw an error",
			wantErr:  true,
			expected: stubPosts,
		},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			db, mock, err := sqlmock.New()
			assert.NoError(t, err)
			gormDB, err := NewMockGormDB(db)
			assert.NoError(t, err)
			persistence := NewPostPersistence()
			ctx := context.WithValue(context.Background(), driver.TxKey, gormDB)
			mock.MatchExpectationsInOrder(false)

			query := mock.ExpectQuery(regexp.QuoteMeta("SELECT * FROM `posts` WHERE `posts`.`deleted_at` IS NULL"))
			if test.wantErr {
				query.WillReturnError(errors.New("error"))
				_, err := persistence.GetPosts(ctx, nil, nil, nil, nil)
				assert.Error(t, err)
			} else {
				// returnRow := sqlmock.NewRows([]string{"id", "body"})
				// for _, p := range stubPosts {
				// 	returnRow.AddRow(p.ID, p.Body)
				// 	query.WillReturnRows(returnRow)
				// }
				// actual, err := persistence.GetPosts(ctx, nil, nil, nil, nil)
				// assert.NoError(t, err)
				// assert.Equal(t, test.expected, actual)
				// assert.NoError(t, mock.ExpectationsWereMet())
			}
		})
	}
}

func TestPostPersistence_GetPostByID(t *testing.T) {
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
		name     string
		wantErr  bool
		expected *entity.Post
	}{
		{
			name:     "should not throw an error",
			wantErr:  false,
			expected: stubPosts[0],
		},
		{
			name:     "should not throw an error",
			wantErr:  true,
			expected: stubPosts[0],
		},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			db, mock, err := sqlmock.New()
			assert.NoError(t, err)
			gormDB, err := NewMockGormDB(db)
			assert.NoError(t, err)
			persistence := NewPostPersistence()
			ctx := context.WithValue(context.Background(), driver.TxKey, gormDB)
			mock.MatchExpectationsInOrder(false)

			query := mock.ExpectQuery(regexp.QuoteMeta("SELECT * FROM `posts`"))
			if test.wantErr {
				query.WillReturnError(errors.New("error"))
				_, err := persistence.GetPostByID(ctx, nil, "1")
				assert.Error(t, err)
			} else {
				// returnRow := sqlmock.NewRows([]string{"id", "body"})
				// returnRow.AddRow(stubPosts[0].ID, stubPosts[0].Body)
				// query.WillReturnRows(returnRow)
				// actual, err := persistence.GetPostByID(ctx, nil, "1")
				// assert.NoError(t, err)
				// assert.Equal(t, test.expected, actual)
				// assert.NoError(t, mock.ExpectationsWereMet())
			}
		})
	}
}
