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

func TestHelloWorldRepository_GetHelloWorld(t *testing.T) {
	tests := []struct {
		name     string
		wantErr  bool
		expected *entity.HelloWorld
	}{
		{
			name:    "should not throw an error",
			wantErr: false,
			expected: &entity.HelloWorld{
				Lang: "ja",
			},
		},
		{
			name:    "should not throw an error",
			wantErr: true,
			expected: &entity.HelloWorld{
				Lang: "en",
			},
		},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			db, mock, err := sqlmock.New()
			assert.NoError(t, err)
			gormDB, err := NewMockGormDB(db)
			assert.NoError(t, err)
			repo := NewHelloWorldRepository()
			ctx := context.WithValue(context.Background(), driver.TxKey, gormDB)
			mock.MatchExpectationsInOrder(false)

			query := mock.ExpectQuery(regexp.QuoteMeta("SELECT * FROM `hello_worlds` WHERE lang = ? ORDER BY `hello_worlds`.`lang` LIMIT 1")).
				WithArgs(sqlmock.AnyArg())
			if test.wantErr {
				query.WillReturnError(errors.New("error"))
				_, err := repo.GetHelloWorld(ctx, test.expected.Lang)
				assert.Error(t, err)
			} else {
				returnRow := sqlmock.NewRows([]string{"lang"})
				returnRow.AddRow(test.expected.Lang)
				query.WillReturnRows(returnRow)
				actual, err := repo.GetHelloWorld(ctx, test.expected.Lang)
				assert.NoError(t, err)
				assert.Equal(t, test.expected, actual)
				assert.NoError(t, mock.ExpectationsWereMet())
			}
		})
	}
}
