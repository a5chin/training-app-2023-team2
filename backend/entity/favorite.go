package entity

type Favorite struct {
	PostID         string `json:"post_id"`
	UserID         string `json:"user_id"`
	FavoritesCount int64  `json:"favorites_count"`
	IsMyFavorite   bool   `json:"is_my_favorite"`
}
