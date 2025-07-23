package routes

import (
	"net/http"

	"ideaThon/internal/auth"
	"ideaThon/internal/entries"
	"ideaThon/internal/ideathons"
	"ideaThon/internal/images"
	"ideaThon/internal/profile"
	"ideaThon/internal/search"
)

func Routes() *http.ServeMux {
	mux := http.NewServeMux()

	auth.Routes(mux)
	images.Routes(mux)
	ideathons.Routes(mux)
	entries.Routes(mux)
	profile.RegisterProfileRoutes(mux)
	search.Routes(mux)

	return mux
}
