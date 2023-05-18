package driver

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"myapp/config"
	"os"
)

const TxKey = "transactionObject"
const ErrDuplicateEntryNumber = 1062

func NewDB(conf *config.Config) *gorm.DB {
	host := conf.Database.Hostname
	port := conf.Database.Port
	dbname := conf.Database.Name
	username := conf.Database.Username
	if conf.Database.Password != "" {
		username += ":" + conf.Database.Password
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
