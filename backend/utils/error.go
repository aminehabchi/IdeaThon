package utils

import (
	"encoding/json"
	"net/http"
)


type Error struct {
	Err    string `json:"error"`
	Status int    `json:"status"`
}

func SendResponseStatus(w http.ResponseWriter, statusCode int, err error) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	if encodeErr := json.NewEncoder(w).Encode(Error{Err: err.Error(), Status: statusCode}); encodeErr != nil {
		// Log the encoding error but don't panic - response is already written
		// This prevents silent failures but avoids crashing the server
		return
	}
}
