package profile

import "ideaThon/internal/auth"

type ProfileResponse struct {
	auth.User
	TotalPrizeWon    int `json:"total_prize_won"`
	WonContextsCount int `json:"won_contexts_count"`
}
