package main

import (
	"fmt"
	database "ideaThon/config"
	mux "ideaThon/routes"
	"log"
	"net/http"
)

func main() {
	err := database.Setup_DB()
	if err != nil {
		log.Println(err)
		return
	}

	config := http.Server{
		Addr:    ":8080",
		Handler: CORSMiddleware(mux.Routes()),
	}

	fmt.Println("Server started on http://localhost:8080")
	log.Println(config.ListenAndServe())
}

func CORSMiddleware(next http.Handler) http.Handler {
	// List of allowed origins
	allowedOrigins := map[string]bool{
		"http://localhost:3000": true, // Add more origins if needed
		"https://your-frontend.com": true,
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")

		if allowedOrigins[origin] {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Credentials", "true")
		}

		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight requests
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}