package repository

import (
	"context"
	"errors"
	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
	"myapp/driver"
	"myapp/entity"
	"regexp"
	"testing"
)

func TestPostRepository_GetPosts(t *testing.T) {
	stubPosts := []*entity.Post{
		{
			ID:    1,
			Title: "a",
			Body:  "a",
		},
		{
			ID:    2,
			Title: "b",
			Body:  "b",
		},
		{
			ID:    3,
			Title: "c",
			Body:  "c",
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
			repo := NewPostRepository()
			ctx := context.WithValue(context.Background(), driver.TxKey, gormDB)
			mock.MatchExpectationsInOrder(false)

			query := mock.ExpectQuery(regexp.QuoteMeta("SELECT * FROM `posts` WHERE `posts`.`deleted_at` IS NULL"))
			if test.wantErr {
				query.WillReturnError(errors.New("error"))
				_, err := repo.GetPosts(ctx, nil, nil)
				assert.Error(t, err)
			} else {
				returnRow := sqlmock.NewRows([]string{"id", "title", "body"})
				for _, p := range stubPosts {
					returnRow.AddRow(p.ID, p.Title, p.Body)
					query.WillReturnRows(returnRow)
				}
				actual, err := repo.GetPosts(ctx, nil, nil)
				assert.NoError(t, err)
				assert.Equal(t, test.expected, actual)
				assert.NoError(t, mock.ExpectationsWereMet())
			}
		})
	}
}
