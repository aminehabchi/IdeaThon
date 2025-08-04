package config

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

var DATABASE *sql.DB = nil

func Setup_DB() error {
	var err error

	// Connect to SQLite DB file (creates if not exists)
	DATABASE, err = sql.Open("sqlite3", "../config/database.db")
	if err != nil {
		return fmt.Errorf("failed to open database: %w", err)
	}

	// Read SQL file containing schema (tables.sql)
	schema, err := os.ReadFile("../config/tables.sql")
	if err != nil {
		DATABASE.Close()
		return fmt.Errorf("failed to read schema file: %w", err)
	}

	// Execute SQL statements in schema file
	_, err = DATABASE.Exec(string(schema))
	if err != nil {
		DATABASE.Close()
		return fmt.Errorf("failed to execute schema: %w", err)
	}

	return nil
}

func Get_DB() *sql.DB {
	return DATABASE
}
