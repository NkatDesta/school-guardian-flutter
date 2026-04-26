-- Create notifications table for the Digital School Communication system
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
    
    -- Foreign key constraints (if users table exists)
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Indexes for better performance
    INDEX idx_recipient_group (recipient_group),
    INDEX idx_sender_id (sender_id),
    INDEX idx_created_at (created_at),
    INDEX idx_priority (priority),
    INDEX idx_status (status)
);

-- Insert sample data for testing
INSERT INTO notifications (title, content, priority, sender_id, recipient_group, status) VALUES
('School Closure Tomorrow', 'Due to maintenance, school will be closed tomorrow. Please make alternative arrangements.', 'emergency', 1, 'all_guardians', 'sent'),
('Parent-Teacher Meeting', 'Reminder: Parent-teacher meetings are scheduled for next week. Please check your scheduled time.', 'normal', 2, 'all_guardians', 'sent'),
('New Homework Policy', 'Please review the new homework policy guidelines available in the staff portal.', 'normal', 1, 'all_teachers', 'sent'),
('Emergency Drill', 'Emergency evacuation drill will be conducted this Friday at 10:00 AM. All staff must participate.', 'emergency', 1, 'all_teachers', 'pending'),
('Welcome Back', 'Welcome back to school! We hope you had a wonderful break and are ready for an amazing semester.', 'normal', 2, 'all_guardians', 'sent');

-- Create view for notification statistics
CREATE VIEW notification_stats AS
SELECT 
    recipient_group,
    priority,
    status,
    COUNT(*) as count,
    DATE(created_at) as date
FROM notifications 
GROUP BY recipient_group, priority, status, DATE(created_at);

-- Create stored procedure for sending notifications
DELIMITER //
CREATE PROCEDURE SendNotification(
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
CREATE TRIGGER update_sent_at 
    BEFORE UPDATE ON notifications
    FOR EACH ROW
BEGIN
    IF OLD.status != 'sent' AND NEW.status = 'sent' THEN
        SET NEW.sent_at = CURRENT_TIMESTAMP;
        SET NEW.delivery_status = 'sent';
    END IF;
END //
DELIMITER ;
