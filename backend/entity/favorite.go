package entity

type Favorite struct {
	ID     string `json:"id"`
	User   *User  `json:"user"`
	Parent *Post  `json:"parent"`
}
