package utils

import (
	"golang.org/x/crypto/bcrypt"

	"github.com/gofrs/uuid"
)

func Get_token() (string, error) {
	u2, err := uuid.NewV4()
	if err != nil {
		return "", err
	}
	return u2.String(), nil
}

func Hash_password(password string) (string, error) {
	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedBytes), nil
}

func Compare_password(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
