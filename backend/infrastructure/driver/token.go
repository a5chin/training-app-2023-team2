package driver

import (
	"encoding/json"
	"errors"
	"github.com/golang-jwt/jwt/v5"
	"myapp/entity"
	"time"
)

type TokenDriver struct{}

func NewTokenDriver() *TokenDriver {
	return &TokenDriver{}
}

const hmacSampleSecret = "hmacSampleSecret"

// DecodeJwt JWTをJsonにパースする
func (d TokenDriver) DecodeJwt(idToken string) (*entity.User, error) {
	CustomClaims := jwt.MapClaims{}
	// tokenからjwt形式へ変換する
	token, _ := jwt.ParseWithClaims(idToken, CustomClaims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte("test"), nil
	})
	if token == nil {
		return nil, errors.New("token is nil")
	}
	jsonString, err := json.Marshal(token.Claims)
	if err != nil {
		return nil, err
	}
	type JwtResponse struct {
		User *entity.User `json:"user"`
	}
	var jwtRes *JwtResponse
	if err := json.Unmarshal(jsonString, &jwtRes); err != nil {
		return nil, err
	}
	return jwtRes.User, err
}

func (d TokenDriver) EncodeJwt(user *entity.User) (string, error) {
	type CustomClaims struct {
		User *entity.User `json:"user"`
		jwt.RegisteredClaims
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, CustomClaims{
		user,
		jwt.RegisteredClaims{
			// Also fixed dates can be used for the NumericDate
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			Issuer:    "test",
		},
	})

	// Sign and get the complete encoded token as a string using the secret
	return token.SignedString([]byte(hmacSampleSecret))
}
