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
	"myapp/entity"
	"myapp/infrastructure/driver"
	"myapp/infrastructure/middleware"
	"myapp/infrastructure/persistence"
	"myapp/usecase"
	"net/http"
)

func main() {
	// Dependency Injection
	db := driver.NewDB()
	tokenDriver := driver.NewTokenDriver()

	postRepo := persistence.NewPostPersistence()
	helloWorldRepo := persistence.NewHelloWorldPersistence()
	userRepo := persistence.NewUserPersistence(tokenDriver)

	postUseCase := usecase.NewPostUseCase(postRepo)
	helloWorldUseCase := usecase.NewHelloWorldUseCase(helloWorldRepo)
	userUseCase := usecase.NewUserUseCase(userRepo)

	postController := controller.NewPostController(postUseCase)
	helloWorldController := controller.NewHelloWorldController(helloWorldUseCase)
	userController := controller.NewUserController(userUseCase)
	favoriteController := controller.NewFavoriteController()

	// Setup webserver
	app := gin.Default()
	app.Use(middleware.Transaction(db))
	app.Use(middleware.Cors())

	app.GET("/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "It works")
	})

	api := app.Group("/api/v1")

	api.GET("/hello", handleResponse(helloWorldController.GetHelloWorld))
	postRouter := api.Group("/posts")
	postRouter.Use(middleware.Authentication(userRepo))
	postRouter.GET("/", handleResponse(postController.GetPosts))
	postRouter.POST("/", handleResponse(postController.CreatePost))
	postRouter.GET("/:postId", handleResponse(postController.GetPostByID))
	postRouter.DELETE("/:postId", handleResponse(postController.DeletePost))
	postRouter.GET("/:postId/replies", handleResponse(postController.GetReplies))
	postRouter.POST("/:postId/replies", handleResponse(postController.CreateReply))

	postRouter.POST("/:postId/favorites", handleResponse(favoriteController.CreateFavorite))
	postRouter.DELETE("/:postId/favorites/:favoriteId", handleResponse(favoriteController.DeleteFavorite))

	api.GET("/users/me", handleResponse(userController.GetMe))
	api.POST("/sign_up", handleResponse(userController.SignUp))
	api.POST("/sign_in", handleResponse(userController.SignIn))

	runApp(app, config.Port)
}

func runApp(app *gin.Engine, port int) {
	docs.SwaggerInfo.Title = "training-app-2023-team2"
	docs.SwaggerInfo.Description = "training-app-2023-team2"
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = fmt.Sprintf("localhost:%d", port)
	docs.SwaggerInfo.BasePath = "/api/v1"
	docs.SwaggerInfo.Schemes = []string{"http"}

	app.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	app.Run(fmt.Sprintf("%s:%d", config.HostName, config.Port))

	log.Println(fmt.Sprintf("http://localhost:%d", port))
	log.Println(fmt.Sprintf("http://localhost:%d/swagger/index.html", port))
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
