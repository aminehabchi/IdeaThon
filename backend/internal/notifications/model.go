package notifications

type Notification struct {
	ID        int    `json:"id"`
	UserID    int    `json:"user_id"`
	Type      string `json:"type"`
	Title     string `json:"title"`
	Message   string `json:"message"`
	Link      string `json:"link,omitempty"`
	IsRead    bool   `json:"is_read"`
	CreatedAt string `json:"created_at"`
}

type GetNotificationsParams struct {
	UserID int  `json:"user_id"`
	Unread bool `json:"unread,omitempty"`
	Limit  int  `json:"limit,omitempty"`
	Offset int  `json:"offset,omitempty"`
}

type MarkAsReadRequest struct {
	NotificationID int `json:"notification_id"`
}

type CreateNotificationRequest struct {
	UserID  int    `json:"user_id"`
	Type    string `json:"type"`
	Title   string `json:"title"`
	Message string `json:"message"`
	Link    string `json:"link,omitempty"`
}
