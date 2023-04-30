package controller

type UserController struct {
	UserRepo
}

func NewUserController(repo UserRepo) *UserController {
	return &UserController{repo}
}
