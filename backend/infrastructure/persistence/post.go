package persistence

import (
	"context"
	"errors"
	"myapp/entity"
	"myapp/infrastructure/driver"
	"myapp/infrastructure/persistence/model"
	"net/http"

	"github.com/go-sql-driver/mysql"
	"gorm.io/gorm"
)

type PostPersistence struct{}

func NewPostPersistence() *PostPersistence {
	return &PostPersistence{}
}

func (p PostPersistence) CreatePost(
	ctx context.Context,
	parentID *string,
	uid,
	body string,
) error {
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)
	if err := db.Create(
		&model.Post{
			ID:       model.GenerateID().String(),
			Body:     body,
			UserID:   uid,
			ParentID: parentID,
		},
	).Error; err != nil {
		var mysqlErr *mysql.MySQLError
		if errors.As(err, &mysqlErr) && mysqlErr.Number == driver.ErrDuplicateEntryNumber {
			return entity.WrapError(http.StatusConflict, err)
		}
		return err
	}
	return nil
}

func (p PostPersistence) DeletePost(
	ctx context.Context,
	uid string,
	pid string,
) error {
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)

	if err := db.Select("id").Where("user_id = ?", uid).First(&model.Post{}, "id=?", pid).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return entity.WrapError(http.StatusNotFound, err)
		}
		return err
	}
	if err := db.Delete(
		&model.Post{}, "id=?", pid,
	).Error; err != nil {
		return err
	}
	return nil
}

func (p PostPersistence) GetPosts(
	ctx context.Context,
	pid, loginUserID *string,
	limit *int,
	offset *int,
) ([]*entity.Post, error) {
	var records []*model.Post
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)
	if limit != nil {
		db = db.Limit(*limit)
	}
	if offset != nil {
		db = db.Offset(*offset)
	}
	if pid != nil {
		db = db.Where("parent_id = ?", pid)
	}
	if err := db.Preload("User").Preload("Parent").Preload("Favorites").Order("posts.id DESC").Find(&records).Error; err != nil {
		return nil, err
	}
	var posts []*entity.Post
	for _, record := range records {
		var repliesCount int64
		if err := db.Model(&model.Post{}).Where("parent_id =?", record.ID).Count(&repliesCount).Error; err != nil {
			return nil, err
		}
		posts = append(posts, record.ToEntity(loginUserID, repliesCount))
	}
	return posts, nil
}

func (p PostPersistence) GetPostByID(
	ctx context.Context,
	loginUserID *string,
	pid string,
) (*entity.Post, error) {
	var record *model.Post
	db, _ := ctx.Value(driver.TxKey).(*gorm.DB)
	if err := db.Preload("User").Preload("Parent").Preload("Favorites").First(&record, "id = ?", pid).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, entity.WrapError(http.StatusNotFound, err)
		}
		return nil, err
	}
	var repliesCount int64
	if err := db.Model(&model.Post{}).Where("parent_id =?", record.ID).Count(&repliesCount).Error; err != nil {
		return nil, err
	}
	return record.ToEntity(loginUserID, repliesCount), nil
}
