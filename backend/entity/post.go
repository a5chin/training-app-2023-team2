package entity

type Post struct {
	ID             string `json:"id"`
	Body           string `json:"body"`
	User           *User  `json:"user"`
	Parent         *Post  `json:"parent"`
	FavoritesCount int64  `json:"favorites_count"`
	IsMyFavorite   bool   `json:"is_my_favorite"`
	RepliesCount   int64  `json:"replies_count"`
}
