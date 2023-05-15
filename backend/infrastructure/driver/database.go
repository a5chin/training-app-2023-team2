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

func NewDB() *gorm.DB {
	host := config.DBHostName
	port := config.DBPort
	dbname := config.DBName
	dsn := fmt.Sprintf("root@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", host, port, dbname)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	db = db.Debug()
	return db
}
