-- MySQL Database Schema for Digital School Communication System

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS digital_school_db;
USE digital_school_db;

-- Messages table for internal communication between guardians and homeroom teachers
CREATE TABLE IF NOT EXISTS messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content TEXT NOT NULL,
    message_type ENUM('general', 'homework', 'behavior', 'health', 'pickup') DEFAULT 'general',
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_sender_id (sender_id),
    INDEX idx_receiver_id (receiver_id),
    INDEX idx_sent_at (sent_at),
    INDEX idx_is_read (is_read)
);

-- Insert sample messages for testing
INSERT IGNORE INTO messages (sender_id, receiver_id, content, message_type, sent_at, is_read) VALUES
(2, 720, 'Please ensure your child completes the homework assignment', 'homework', '2026-03-14 10:00:00', false),
(720, 2, 'Thank you for the update. I will help my child with the homework.', 'general', '2026-03-14 10:30:00', false),
(3, 721, 'Your child was very active and participated well in class today.', 'behavior', '2026-03-14 14:00:00', false),
(721, 3, 'That\'s wonderful to hear! Thank you for letting me know.', 'general', '2026-03-14 14:15:00', false);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('director', 'registrar', 'teacher', 'homeroom_teacher', 'guardian') NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone_no VARCHAR(20),
    address TEXT,
    national_id VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT 1,
    last_login TIMESTAMP NULL
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    content TEXT NOT NULL,
    priority ENUM('normal', 'emergency') DEFAULT 'normal',
    sender_id INT NOT NULL,
    recipient_group ENUM('all_guardians', 'all_teachers', 'specific_class', 'specific_users') NOT NULL,
    status ENUM('pending', 'sent', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    scheduled_for TIMESTAMP NULL,
    sent_at TIMESTAMP NULL,
    delivery_status ENUM('pending', 'sent', 'failed') DEFAULT 'pending',
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_recipient_group (recipient_group),
    INDEX idx_sender_id (sender_id),
    INDEX idx_created_at (created_at),
    INDEX idx_priority (priority),
    INDEX idx_status (status)
);

-- Insert default staff users
INSERT IGNORE INTO users (email, password_hash, role, full_name) VALUES
('director@school.com', 'director123', 'director', 'School Director'),
('registrar@school.com', 'registrar456', 'registrar', 'School Registrar'),
('teacher@school.com', 'teacher789', 'teacher', 'Teacher'),
('homeroom@school.com', 'homeroom012', 'homeroom_teacher', 'Homeroom Teacher');

-- Insert sample notifications
INSERT IGNORE INTO notifications (title, content, priority, sender_id, recipient_group, status, delivery_status) VALUES
('School Closure Tomorrow', 'Due to maintenance, school will be closed tomorrow. Please make alternative arrangements.', 'emergency', 1, 'all_guardians', 'sent', 'sent'),
('Parent-Teacher Meeting', 'Reminder: Parent-teacher meetings are scheduled for next week. Please check your scheduled time.', 'normal', 2, 'all_guardians', 'sent', 'sent'),
('New Homework Policy', 'Please review the new homework policy guidelines available in the staff portal.', 'normal', 1, 'all_teachers', 'sent', 'sent'),
('Emergency Drill', 'Emergency evacuation drill will be conducted this Friday at 10:00 AM. All staff must participate.', 'emergency', 1, 'all_teachers', 'pending', 'pending'),
('Welcome Back', 'Welcome back to school! We hope you had a wonderful break and are ready for an amazing semester.', 'normal', 2, 'all_guardians', 'sent', 'sent');

-- Update notifications table to match requirements
ALTER TABLE notifications 
ADD COLUMN IF NOT EXISTS recipient_role VARCHAR(50) DEFAULT 'all',
ADD COLUMN IF NOT EXISTS created_by INT,
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'sent',
DROP COLUMN IF EXISTS priority,
DROP COLUMN IF EXISTS sender_id,
DROP COLUMN IF EXISTS recipient_group,
DROP COLUMN IF EXISTS delivery_status,
DROP COLUMN IF EXISTS scheduled_for,
DROP COLUMN IF EXISTS sent_at;

-- Add foreign key for created_by
ALTER TABLE notifications 
ADD CONSTRAINT fk_notifications_created_by 
FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL;

-- Create stored procedure for sending notifications
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS SendNotification(
    IN p_title VARCHAR(150),
    IN p_content TEXT,
    IN p_priority ENUM('normal', 'emergency'),
    IN p_sender_id INT,
    IN p_recipient_group ENUM('all_guardians', 'all_teachers', 'specific_class', 'specific_users')
)
BEGIN
    INSERT INTO notifications (title, content, priority, sender_id, recipient_group, status, delivery_status)
    VALUES (p_title, p_content, p_priority, p_sender_id, p_recipient_group, 'pending', 'pending');
    
    SELECT LAST_INSERT_ID() as notification_id;
END //
DELIMITER ;

-- Create trigger to update sent_at when status changes to sent
DELIMITER //
CREATE TRIGGER IF NOT EXISTS update_sent_at 
    BEFORE UPDATE ON notifications
    FOR EACH ROW
BEGIN
    IF OLD.status != 'sent' AND NEW.status = 'sent' THEN
        SET NEW.sent_at = CURRENT_TIMESTAMP;
        SET NEW.delivery_status = 'sent';
    END IF;
END //
DELIMITER ;

-- Show table structures
SHOW TABLES;
DESCRIBE users;
DESCRIBE notifications;
