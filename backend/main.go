package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"log"
	"myapp/config"
	"myapp/controller"
	"myapp/docs"
	"myapp/driver"
	"myapp/entity"
	"myapp/middleware"
	"myapp/repository"
	"net/http"
)

func main() {
	// Dependency Injection
	db := driver.NewDB()
	postRepo := repository.NewPostRepository()
	helloWorldRepo := repository.NewHelloWorldRepository()
	userRepo := repository.NewUserRepository()

	postController := controller.NewPostController(postRepo)
	helloWorldController := controller.NewHelloWorldController(helloWorldRepo)
	_ = controller.NewUserController(userRepo)

	// Setup webserver
	app := gin.Default()
	app.Use(middleware.Transaction(db))
	app.Use(middleware.Cors())

	app.GET("/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "It works")
	})
	app.GET("/hello", handleResponse(helloWorldController.GetHelloWorld))
	app.GET("/posts", handleResponse(postController.GetPosts))

	runApp(app, config.Port)
}

func runApp(app *gin.Engine, port int) {
	docs.SwaggerInfo.Title = "training-app-2023-team2"
	docs.SwaggerInfo.Description = "training-app-2023-team2"
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = fmt.Sprintf("localhost:%d", port)
	docs.SwaggerInfo.BasePath = "/"
	docs.SwaggerInfo.Schemes = []string{"http"}
	app.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	log.Println(fmt.Sprintf("http://localhost:%d", port))
	log.Println(fmt.Sprintf("http://localhost:%d/swagger/index.html", port))
	app.Run(fmt.Sprintf("%s:%d", config.HostName, config.Port))
}

func handleResponse(f func(ctx *gin.Context) (interface{}, error)) gin.HandlerFunc {
	return func(c *gin.Context) {
		result, err := f(c)
		if err != nil {
			e, ok := err.(*entity.Error)
			if ok {
				c.JSON(e.Code, entity.ErrorResponse{Message: err.Error()})
			} else {
				c.JSON(http.StatusInternalServerError, entity.ErrorResponse{Message: err.Error()})
			}
			c.Abort()
		} else {
			c.JSON(http.StatusOK, result)
		}
	}
}
