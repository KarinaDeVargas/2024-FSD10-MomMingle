-- Drop existing MomMingle Database if it exists
DROP DATABASE IF EXISTS mommingle;

-- Create MomMingle Database
CREATE DATABASE mommingle;

-- Use the MomMingle Database
USE mommingle;

-- Create Tables
-- Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    organizer_id INT NOT NULL,
    event_date DATETIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    activities VARCHAR(50) NOT NULL,
    age_range  VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Event Attendees Table (Many-to-Many Relationship between events and users)
CREATE TABLE IF NOT EXISTS event_attendees (
    event_id INT,
    user_id INT,
    PRIMARY KEY (event_id, user_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Groups Table
CREATE TABLE IF NOT EXISTS groups (
    group_id INT AUTO_INCREMENT PRIMARY KEY,
    group_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Chat Messages Table
CREATE TABLE chat_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId VARCHAR(255) NOT NULL,
    receiverId VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



