package endpoint

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/noonyuu/rss-diet-theater/app/database"
	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
)

func Count(c *gin.Context) {
	speechID := c.Param("speechID")
	id, err := strconv.Atoi(speechID)
	fmt.Println(id)
	var accessControl database.AccessControl

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

	if err := dbConn.Where("speech_id = ?", id).First(&accessControl).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			// 記事がまだ存在しない場合、新しいレコードを作成
			accessControl = database.AccessControl{SpeechID: uint(id), ViewCount: 1}
			if err := dbConn.Create(&accessControl).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	} else {
		// 記事が存在する場合、閲覧回数をインクリメント
		accessControl.ViewCount++
		if err := dbConn.Save(&accessControl).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}
	c.JSON(http.StatusOK, accessControl)
}
