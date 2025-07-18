package utils

import (
	"log"

	"github.com/gofrs/uuid"
)

func Get_token() (string, error) {
	u2, err := uuid.NewV4()
	if err != nil {
		log.Printf("failed to generate UUID: %v", err)
		return "", err
	}
	return u2.String(), nil
}
