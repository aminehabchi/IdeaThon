package notifications

import (
	"database/sql"
	"fmt"
	"ideaThon/config"
)

// CreateNotification creates a new notification
func CreateNotification(notification CreateNotificationRequest) (int64, error) {
	query := `INSERT INTO notifications (user_id, type, title, message, link)
			  VALUES (?, ?, ?, ?, ?)`

	result, err := config.DATABASE.Exec(query,
		notification.UserID,
		notification.Type,
		notification.Title,
		notification.Message,
		notification.Link,
	)
	if err != nil {
		return 0, fmt.Errorf("failed to create notification: %w", err)
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, fmt.Errorf("failed to get notification id: %w", err)
	}

	return id, nil
}

// GetNotifications retrieves notifications for a user
func GetNotifications(params GetNotificationsParams) ([]Notification, error) {
	query := `SELECT id, user_id, type, title, message, link, is_read, created_at
			  FROM notifications
			  WHERE user_id = ?`

	args := []interface{}{params.UserID}

	if params.Unread {
		query += " AND is_read = 0"
	}

	query += " ORDER BY created_at DESC"

	if params.Limit > 0 {
		query += " LIMIT ?"
		args = append(args, params.Limit)
	}

	if params.Offset > 0 {
		query += " OFFSET ?"
		args = append(args, params.Offset)
	}

	rows, err := config.DATABASE.Query(query, args...)
	if err != nil {
		return nil, fmt.Errorf("failed to query notifications: %w", err)
	}
	defer rows.Close()

	var notifications []Notification
	for rows.Next() {
		var n Notification
		var isRead int
		var link sql.NullString

		err := rows.Scan(&n.ID, &n.UserID, &n.Type, &n.Title, &n.Message, &link, &isRead, &n.CreatedAt)
		if err != nil {
			return nil, fmt.Errorf("failed to scan notification: %w", err)
		}

		n.IsRead = isRead == 1
		if link.Valid {
			n.Link = link.String
		}

		notifications = append(notifications, n)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating notifications: %w", err)
	}

	return notifications, nil
}

// MarkAsRead marks a notification as read
func MarkAsRead(notificationID, userID int) error {
	query := `UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?`

	result, err := config.DATABASE.Exec(query, notificationID, userID)
	if err != nil {
		return fmt.Errorf("failed to mark notification as read: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("notification not found or unauthorized")
	}

	return nil
}

// MarkAllAsRead marks all notifications as read for a user
func MarkAllAsRead(userID int) error {
	query := `UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0`

	_, err := config.DATABASE.Exec(query, userID)
	if err != nil {
		return fmt.Errorf("failed to mark all notifications as read: %w", err)
	}

	return nil
}

// DeleteNotification deletes a notification
func DeleteNotification(notificationID, userID int) error {
	query := `DELETE FROM notifications WHERE id = ? AND user_id = ?`

	result, err := config.DATABASE.Exec(query, notificationID, userID)
	if err != nil {
		return fmt.Errorf("failed to delete notification: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("notification not found or unauthorized")
	}

	return nil
}

// GetUnreadCount gets the count of unread notifications for a user
func GetUnreadCount(userID int) (int, error) {
	query := `SELECT COUNT(*) FROM notifications WHERE user_id = ? AND is_read = 0`

	var count int
	err := config.DATABASE.QueryRow(query, userID).Scan(&count)
	if err != nil {
		return 0, fmt.Errorf("failed to get unread count: %w", err)
	}

	return count, nil
}
