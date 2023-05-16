package entity

type Post struct {
	ID     string `json:"id"`
	Body   string `json:"body"`
	User   *User  `json:"user"`
	Parent *Post  `json:"parent"`
}
