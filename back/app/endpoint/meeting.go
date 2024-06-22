package endpoint

import (
	"github.com/noonyuu/rss-diet-theater/app/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func All(c *gin.Context) {
	var meetingRecords []database.MeetingRecord

	dbConn, err := database.GetDB()
	if err != nil {
		// データベース接続の取得に失敗した場合のエラーハンドリング
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database."})
		return
	}
	if dbConn == nil {
		// dbConnがnilの場合のエラーハンドリング
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection is nil."})
		return
	}

	if err := dbConn.Find(&meetingRecords).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, meetingRecords)
}
