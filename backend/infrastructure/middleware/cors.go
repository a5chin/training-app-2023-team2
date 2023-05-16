package middleware

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"myapp/config"
)

func Cors(conf *config.Config) gin.HandlerFunc {
	cdc := cors.DefaultConfig()
	cdc.AllowOrigins = []string{conf.Cors.Allow.Origin}
	cdc.AllowCredentials = true
	return cors.New(cdc)
}
