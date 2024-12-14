package handlers

import (
	"chordify/src/database"
	"chordify/src/models"
	"log"
	"net/http"

	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
)

func SearchSongs(c *gin.Context) {
	query := c.Query("q")
	log.Printf("Search query received: %q", query)

	var songs []models.Song

	if query != "" {
		searchPattern := "%" + query + "%"
		result := database.DB.Where("title ILIKE ? OR artist ILIKE ?", searchPattern, searchPattern).Find(&songs)
		if result.Error != nil {
			log.Printf("Error executing search query: %v", result.Error)
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":   "Failed to search songs",
				"details": result.Error.Error(),
			})
			return
		}

		log.Printf("Found %d songs matching query %q", len(songs), query)

		if len(songs) == 0 {
			c.JSON(http.StatusOK, gin.H{
				"message": "No songs found matching the search criteria",
				"songs":   []models.Song{},
			})
			return
		}
	} else {
		result := database.DB.Find(&songs)
		if result.Error != nil {
			log.Printf("Error fetching all songs: %v", result.Error)
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":   "Failed to fetch songs",
				"details": result.Error.Error(),
			})
			return
		}
		log.Printf("Retrieved all songs, count: %d", len(songs))
	}

	c.JSON(http.StatusOK, gin.H{
		"count": len(songs),
		"songs": songs,
	})
}

func GetSongByID(c *gin.Context) {
	id := c.Param("id")
	log.Printf("Fetching song with ID: %s", id)

	var song models.Song
	// Measuresの順序を指定して取得
	result := database.DB.
		Preload("Measures", func(db *gorm.DB) *gorm.DB {
			return db.Order("measure_number ASC")
		}).
		Preload("Sections", func(db *gorm.DB) *gorm.DB {
			return db.Order("start_measure ASC")
		}).
		First(&song, id)

	if result.Error != nil {
		log.Printf("Error fetching song with ID %s: %v", id, result.Error)
		c.JSON(http.StatusNotFound, gin.H{
			"error":   "Song not found",
			"details": result.Error.Error(),
		})
		return
	}

	log.Printf("Found song: ID=%d, Title=%q, Artist=%q, Measures count: %d, Sections count: %d",
		song.ID, song.Title, song.Artist, len(song.Measures), len(song.Sections))

	c.JSON(http.StatusOK, song)
}
