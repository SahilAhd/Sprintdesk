-- 1. Create Database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS sprintdesk_db;

-- 2. Switch to using sprintdesk_db
USE sprintdesk_db;

-- 3. Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Stored as bcrypt hash
    initials VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
    id VARCHAR(50) PRIMARY KEY, -- Unique Task Key (e.g., 'SD-101')
    title VARCHAR(255) NOT NULL,
    status ENUM('backlog', 'in_progress', 'review', 'done') DEFAULT 'backlog',
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    due_date VARCHAR(50),
    user_id INT, -- Foreign key referencing the assigned user
    comments JSON, -- Native JSON column to hold array of comment objects
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);