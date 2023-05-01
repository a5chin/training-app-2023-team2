package entity

type Post struct {
	ID    uint   `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
	User  *User  `json:"user"`
}
