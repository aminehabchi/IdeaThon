PRAGMA foreign_keys = ON;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL CHECK(role IN ('admin', 'user')) DEFAULT 'user',
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    avatar TEXT,
    phone_number TEXT,
    bio TEXT,
    country TEXT DEFAULT NULL,
    is_banned INTEGER DEFAULT 0 CHECK(is_banned IN (0, 1)),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- Ideathons table
CREATE TABLE IF NOT EXISTS ideathons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    description TEXT DEFAULT '',
    banner TEXT DEFAULT '',
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    price INTEGER DEFAULT 0,
    end_date DATETIME DEFAULT NULL,
    winner_id INTEGER DEFAULT NULL,
    privacy TEXT DEFAULT 'public',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ideathons_categories (
    ideathon_id INTEGER NOT NULL,
    category TEXT NOT NULL,
    FOREIGN KEY (ideathon_id) REFERENCES ideathons(id) ON DELETE CASCADE
);

-- Entries table
CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    ideathon_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    banner TEXT DEFAULT '',
    is_win INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (ideathon_id) REFERENCES ideathons(id) ON DELETE CASCADE
);

-- sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Reports table
CREATE TABLE IF NOT EXISTS report (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type_id INTEGER DEFAULT 0,
    email TEXT NOT NULL  DEFAULT '',
    subject TEXT NOT NULL DEFAULT '',
    type TEXT NOT NULL CHECK(type IN ('generale', 'ideathon', 'entrie')),
    issue TEXT NOT NULL CHECK(issue IN ('spam', 'harassment', 'misinformation', 'other', 'copyright', 'inappropriate','illegal', 'bug', 'feature', 'security','general')),
    description TEXT NOT NULL,
    is_solved INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);