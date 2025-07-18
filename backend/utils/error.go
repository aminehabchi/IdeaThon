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

	json.NewEncoder(w).Encode(Error{Err: err.Error(), Status: statusCode})
}
