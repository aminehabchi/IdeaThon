package routes

import (
	"net/http"

	"ideaThon/internal/auth"
	"ideaThon/internal/entries"
	"ideaThon/internal/ideathons"
	"ideaThon/internal/images"
	"ideaThon/internal/profile"
)

func Routes() *http.ServeMux {
	mux := http.NewServeMux()

	auth.Routes(mux)
	images.Routes(mux)
	ideathons.Routes(mux)
	entries.Routes(mux)
	profile.RegisterProfileRoutes(mux)

	return mux
}
