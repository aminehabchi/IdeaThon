package notifications

import (
	"fmt"
	"ideaThon/config"
	"log"
)

// NotifyNewIdeathon sends notifications to all users about a new ideathon
func NotifyNewIdeathon(ideathonID int, ideathonTitle string, creatorID int) error {
	log.Printf("[NOTIFICATIONS] NotifyNewIdeathon called - ideathonID: %d, title: %s, creatorID: %d", ideathonID, ideathonTitle, creatorID)

	// Get all users except the creator
	query := `SELECT id FROM users WHERE id != ?`
	rows, err := config.DATABASE.Query(query, creatorID)
	if err != nil {
		log.Printf("[NOTIFICATIONS] Failed to get users: %v", err)
		return fmt.Errorf("failed to get users: %w", err)
	}
	defer rows.Close()

	var userIDs []int
	for rows.Next() {
		var userID int
		if err := rows.Scan(&userID); err != nil {
			continue
		}
		userIDs = append(userIDs, userID)
	}

	log.Printf("[NOTIFICATIONS] Found %d users to notify", len(userIDs))

	// Create notification for each user
	for _, userID := range userIDs {
		notificationReq := CreateNotificationRequest{
			UserID:  userID,
			Type:    "new_ideathon",
			Title:   "New Ideathon Available",
			Message: fmt.Sprintf("A new ideathon '%s' has been created. Check it out and submit your ideas!", ideathonTitle),
			Link:    fmt.Sprintf("/ideas/%d", ideathonID),
		}

		notifID, err := CreateNotification(notificationReq)
		if err != nil {
			// Log error but continue with other notifications
			log.Printf("[NOTIFICATIONS] Failed to create notification for user %d: %v", userID, err)
		} else {
			log.Printf("[NOTIFICATIONS] Created notification ID %d for user %d", notifID, userID)
		}
	}

	return nil
}

// NotifyNewEntry sends notification to ideathon owner about a new entry
func NotifyNewEntry(ideathonID int, ideathonTitle string, submitterName string, ownerID int) error {
	log.Printf("[NOTIFICATIONS] NotifyNewEntry called - ideathonID: %d, title: %s, submitter: %s, ownerID: %d", ideathonID, ideathonTitle, submitterName, ownerID)

	notificationReq := CreateNotificationRequest{
		UserID:  ownerID,
		Type:    "new_entry",
		Title:   "New Entry Submitted",
		Message: fmt.Sprintf("%s has submitted an entry to your ideathon '%s'", submitterName, ideathonTitle),
		Link:    fmt.Sprintf("/ideas/%d", ideathonID),
	}

	notifID, err := CreateNotification(notificationReq)
	if err != nil {
		log.Printf("[NOTIFICATIONS] Failed to create entry notification: %v", err)
		return fmt.Errorf("failed to create entry notification: %w", err)
	}

	log.Printf("[NOTIFICATIONS] Created entry notification ID %d for owner %d", notifID, ownerID)
	return nil
}

// NotifyWinner sends notification to the winner
func NotifyWinner(ideathonID int, ideathonTitle string, winnerID int) error {
	log.Printf("[NOTIFICATIONS] NotifyWinner called - ideathonID: %d, title: %s, winnerID: %d", ideathonID, ideathonTitle, winnerID)

	notificationReq := CreateNotificationRequest{
		UserID:  winnerID,
		Type:    "winner",
		Title:   "Congratulations! You Won",
		Message: fmt.Sprintf("You have been selected as the winner of '%s'", ideathonTitle),
		Link:    fmt.Sprintf("/ideas/%d", ideathonID),
	}

	notifID, err := CreateNotification(notificationReq)
	if err != nil {
		log.Printf("[NOTIFICATIONS] Failed to create winner notification: %v", err)
		return fmt.Errorf("failed to create winner notification: %w", err)
	}

	log.Printf("[NOTIFICATIONS] Created winner notification ID %d for winner %d", notifID, winnerID)
	return nil
}

// NotifyIdeathonDeadline sends notification to participants about approaching deadline
func NotifyIdeathonDeadline(ideathonID int, ideathonTitle string, participantIDs []int) error {
	for _, userID := range participantIDs {
		notificationReq := CreateNotificationRequest{
			UserID:  userID,
			Type:    "deadline",
			Title:   "Ideathon Deadline Approaching",
			Message: fmt.Sprintf("The ideathon '%s' is ending soon. Don't miss your chance to submit", ideathonTitle),
			Link:    fmt.Sprintf("/ideas/%d", ideathonID),
		}

		_, err := CreateNotification(notificationReq)
		if err != nil {
			fmt.Printf("Failed to create deadline notification for user %d: %v\n", userID, err)
		}
	}

	return nil
}
