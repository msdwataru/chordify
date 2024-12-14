package database

import (
	"chordify/src/models"
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	dsn := "host=db user=postgres password=postgres dbname=chordify port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// マイグレーション
	db.AutoMigrate(&models.Song{}, &models.Measure{}, &models.Section{})

	DB = db
	fmt.Println("Database connected successfully")
}
