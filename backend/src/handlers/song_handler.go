package handlers

import (
	"chordify/src/database"
	"chordify/src/models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SearchSongs(c *gin.Context) {
	query := c.Query("q")
	log.Printf("Search query received: %q", query)

	var songs []models.Song

	if query != "" {
		// 検索パターンを作成
		searchPattern := "%" + query + "%"

		// クエリの実行とエラーハンドリング
		result := database.DB.Where("title ILIKE ? OR artist ILIKE ?", searchPattern, searchPattern).Find(&songs)
		//result := database.DB.Where("title ILIKE '%X%' OR artist ILIKE '%X%'").Find(&songs)
		if result.Error != nil {
			log.Printf("Error executing search query: %v", result.Error)
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":   "Failed to search songs",
				"details": result.Error.Error(),
			})
			return
		}

		log.Printf("Found %d songs matching query %q", len(songs), query)

		// 検索結果が0件の場合
		if len(songs) == 0 {
			c.JSON(http.StatusOK, gin.H{
				"message": "No songs found matching the search criteria",
				"songs":   []models.Song{},
			})
			return
		}
	} else {
		// クエリパラメータがない場合は全件取得
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

	// 結果の詳細をログに出力（デバッグ用）
	for i, song := range songs {
		log.Printf("Result %d: ID=%d, Title=%q, Artist=%q", i+1, song.ID, song.Title, song.Artist)
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
	result := database.DB.First(&song, id)

	if result.Error != nil {
		log.Printf("Error fetching song with ID %s: %v", id, result.Error)
		c.JSON(http.StatusNotFound, gin.H{
			"error":   "Song not found",
			"details": result.Error.Error(),
		})
		return
	}

	log.Printf("Found song: ID=%d, Title=%q, Artist=%q", song.ID, song.Title, song.Artist)
	c.JSON(http.StatusOK, song)
}
