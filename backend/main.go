package main

import (
	"fmt"
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

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title			training-app-2023-team2
// @description	training-app-2023-team2
// @version		1.0
func main() {
	// Dependency Injection
	conf := config.Load()
	db := driver.NewDB(conf)
	tokenDriver := driver.NewTokenDriver(conf)

	postRepo := persistence.NewPostPersistence()
	helloWorldRepo := persistence.NewHelloWorldPersistence()
	userRepo := persistence.NewUserPersistence(tokenDriver)
	favoriteRepo := persistence.NewFavoritePersistence()

	postUseCase := usecase.NewPostUseCase(postRepo)
	helloWorldUseCase := usecase.NewHelloWorldUseCase(helloWorldRepo)
	userUseCase := usecase.NewUserUseCase(userRepo)
	favoriteUseCase := usecase.NewFavoriteUseCase(favoriteRepo)

	postController := controller.NewPostController(postUseCase)
	helloWorldController := controller.NewHelloWorldController(helloWorldUseCase)
	userController := controller.NewUserController(userUseCase)
	favoriteController := controller.NewFavoriteController(favoriteUseCase)

	// Setup webserver
	app := gin.Default()
	app.Use(middleware.Transaction(db))
	app.Use(middleware.Cors(conf))

	app.GET("/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "It works")
	})

	api := app.Group("/api/v1")

	api.GET("/hello", handleResponse(helloWorldController.GetHelloWorld))
	postRouter := api.Group("/posts")
	postRouter.Use(middleware.Authentication(userRepo))
	postRouter.GET("/", handleResponse(postController.GetPosts))
	postRouter.POST("/", handleResponse(postController.CreatePost))
	postRouter.GET("/:postId/", handleResponse(postController.GetPostByID))
	postRouter.DELETE("/:postId/", handleResponse(postController.DeletePost))
	postRouter.GET("/:postId/replies/", handleResponse(postController.GetReplies))
	postRouter.POST("/:postId/replies/", handleResponse(postController.CreateReply))

	postRouter.POST("/:postId/favorites/", handleResponse(favoriteController.CreateFavorite))
	postRouter.DELETE("/:postId/favorites/", handleResponse(favoriteController.DeleteFavorite))

	api.GET("/users/", handleResponse(userController.GetUsers))
	api.GET("/users/me/", handleResponse(userController.GetMe))
	api.GET("/users/:userId", handleResponse(userController.GetUser))
	authGroup := api.Group("/")
	{
		authGroup.Use(middleware.Authentication(userRepo))
		authGroup.PUT("/users/me/profile/", handleResponse(userController.UpdateProfile))
	}
	api.POST("/sign_up/", handleResponse(userController.SignUp))
	api.POST("/sign_in/", handleResponse(userController.SignIn))
	api.POST("/sign_out/", handleResponse(userController.SignOut))

	runApp(app, conf)
}

func runApp(app *gin.Engine, conf *config.Config) {
	docs.SwaggerInfo.Host = fmt.Sprintf("localhost:%d", conf.Port)
	docs.SwaggerInfo.BasePath = "/api/v1"
	docs.SwaggerInfo.Schemes = []string{"http"}

	app.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	app.Run(fmt.Sprintf("%s:%d", conf.Hostname, conf.Port))

	log.Println(fmt.Sprintf("http://localhost:%d", conf.Port))
	log.Println(fmt.Sprintf("http://localhost:%d/swagger/index.html", conf.Port))
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
