package driver

import (
	"encoding/json"
	"errors"
	"github.com/golang-jwt/jwt/v5"
	"myapp/config"
	"myapp/entity"
	"time"
)

type TokenDriver struct {
	*config.Config
}

func NewTokenDriver(conf *config.Config) *TokenDriver {
	return &TokenDriver{
		conf,
	}
}

// DecodeJwt JWTをJsonにパースする
func (d TokenDriver) DecodeJwt(idToken string) (*entity.User, error) {
	CustomClaims := jwt.MapClaims{}
	// tokenからjwt形式へ変換する
	token, err := jwt.ParseWithClaims(idToken, CustomClaims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(d.Config.Jwt.Secret), nil
	})
	if token == nil {
		return nil, errors.New("token is nil")
	}
	if err != nil {
		return nil, err
	}
	jsonString, err := json.Marshal(token.Claims)
	if err != nil {
		return nil, err
	}
	type JwtResponse struct {
		Iss  string       `json:"iss"`
		User *entity.User `json:"user"`
	}
	var jwtRes *JwtResponse
	if err := json.Unmarshal(jsonString, &jwtRes); err != nil {
		return nil, err
	}
	// issuerの検証
	if jwtRes.Iss != d.Config.Jwt.Issuer {
		return nil, errors.New("invalid issuer")
	}
	return jwtRes.User, nil
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
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(1 * time.Hour)),
			Issuer:    d.Config.Jwt.Issuer,
		},
	})

	// Sign and get the complete encoded token as a string using the secret
	return token.SignedString([]byte(d.Config.Jwt.Secret))
}
