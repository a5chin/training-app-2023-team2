package entity

const ContextAuthUserKey = "authUser"
const AuthCookieKey = "authorization"

type User struct {
	ID      string `json:"id"`
	Email   string `json:"email"`
	Name    string `json:"name"`
	Profile string `json:"profile"`
}
