package driver

import (
	"fmt"
	"myapp/config"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

const TxKey = "transactionObject"
const ErrDuplicateEntryNumber = 1062

func NewDB(conf *config.Config) *gorm.DB {
	host := conf.DB.Hostname
	port := conf.DB.Port
	dbname := conf.DB.Name
	username := conf.DB.Username
	if conf.DB.Password != "" {
		username += ":" + conf.DB.Password
	}
	dsn := fmt.Sprintf("%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", username, host, port, dbname)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	db = db.Debug()
	return db
}
