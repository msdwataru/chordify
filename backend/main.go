package main

import (
	"chordify/src/database"
	"chordify/src/handlers"
	"fmt"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// カスタムログフォーマッタ
func customLogFormatter(param gin.LogFormatterParams) string {
	return fmt.Sprintf("[GIN] %s | %s | %d | %s | %s | Latency: %s | Error: %s\n",
		param.TimeStamp.Format("2006-01-02 15:04:05"),
		param.ClientIP,
		param.StatusCode,
		param.Method,
		param.Path,
		param.Latency,
		param.ErrorMessage,
	)
}

// リクエスト/レスポンスのロギングミドルウェア
func requestResponseLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		// リクエスト開始時間
		startTime := time.Now()

		// リクエスト情報のログ
		log.Printf("➡️  Request: %s %s", c.Request.Method, c.Request.URL.Path)
		if c.Request.URL.RawQuery != "" {
			log.Printf("📎 Query: %s", c.Request.URL.RawQuery)
		}

		// レスポンスをキャプチャ
		blw := &bodyLogWriter{body: []byte{}, ResponseWriter: c.Writer}
		c.Writer = blw

		// 次のハンドラーを実行
		c.Next()

		// レスポンス情報のログ
		duration := time.Since(startTime)
		log.Printf("⬅️  Response Status: %d (in %v)", c.Writer.Status(), duration)
		if len(blw.body) > 0 {
			log.Printf("📦 Response Body: %s", string(blw.body))
		}
		log.Println("----------------------------------")
	}
}

// レスポンスボディをキャプチャするための構造体
type bodyLogWriter struct {
	gin.ResponseWriter
	body []byte
}

func (w *bodyLogWriter) Write(b []byte) (int, error) {
	w.body = append(w.body, b...)
	return w.ResponseWriter.Write(b)
}

func main() {
	// ログのフォーマット設定
	log.SetFlags(log.Ldate | log.Ltime | log.Lmicroseconds)

	// Ginのモード設定
	gin.SetMode(gin.DebugMode)

	// データベース接続
	log.Println("🔌 Initializing database connection...")
	database.Connect()

	// Ginルーターの初期化
	r := gin.New()

	// CORSミドルウェアの設定
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"} // フロントエンドのオリジン
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	config.AllowCredentials = true

	// CORSミドルウェアを追加
	r.Use(cors.New(config))

	// 他のミドルウェアの設定
	r.Use(requestResponseLogger())
	r.Use(gin.LoggerWithFormatter(customLogFormatter))
	r.Use(gin.Recovery())

	// ルートの設定
	api := r.Group("/api")
	{
		songs := api.Group("/songs")
		{
			songs.GET("/search", handlers.SearchSongs)
			songs.GET("/:id", handlers.GetSongByID)
		}
	}

	// 登録されたルートの一覧を表示
	log.Println("📋 Available Routes:")
	for _, route := range r.Routes() {
		log.Printf("   %s %s", route.Method, route.Path)
	}

	// サーバーの起動
	log.Println("🚀 Server is running on port 8080...")
	if err := r.Run(":8080"); err != nil {
		log.Fatal("❌ Server failed to start:", err)
	}
}
