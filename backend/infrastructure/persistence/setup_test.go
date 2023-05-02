package persistence

import (
	"database/sql"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewMockGormDB(db *sql.DB) (*gorm.DB, error) {
	return gorm.Open(mysql.Dialector{
		Config: &mysql.Config{
			DriverName:                "mysql",
			Conn:                      db,
			SkipInitializeWithVersion: true}},
		&gorm.Config{})
}
