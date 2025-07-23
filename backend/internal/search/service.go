package search

import (
	"log"
	"strings"
)

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{
		repo: repo,
	}
}

func (s *Service) Search(query string) (*SearchResponse, error) {
	// Trim whitespace and validate query
	query = strings.TrimSpace(query)
	if query == "" {
		return &SearchResponse{}, nil
	}

	// Search users and ideathons concurrently
	usersChan := make(chan []UserResult)
	ideathonsChan := make(chan []IdeathonResult)
	errChan := make(chan error, 2)

	// Search users in goroutine
	go func() {
		users, err := s.repo.SearchUsers(query)
		if err != nil {
			log.Printf("Error searching users: %v", err)
			errChan <- err
			return
		}
		usersChan <- users
	}()

	// Search ideathons in goroutine
	go func() {
		ideathons, err := s.repo.SearchIdeathons(query)
		if err != nil {
			log.Printf("Error searching ideathons: %v", err)
			errChan <- err
			return
		}
		ideathonsChan <- ideathons
	}()

	// Collect results
	var users []UserResult
	var ideathons []IdeathonResult
	var searchErr error

	for i := 0; i < 2; i++ {
		select {
		case u := <-usersChan:
			users = u
		case id := <-ideathonsChan:
			ideathons = id
		case err := <-errChan:
			if searchErr == nil {
				searchErr = err
			}
		}
	}

	// If there was an error, return it
	if searchErr != nil {
		return nil, searchErr
	}

	// Return combined results
	return &SearchResponse{
		Users:     users,
		Ideathons: ideathons,
	}, nil
}
