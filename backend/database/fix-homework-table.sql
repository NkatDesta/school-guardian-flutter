-- Drop and recreate Homework table with correct structure
-- This will fix the "Unknown column 'title' in 'field list" error

-- Drop the existing incorrect table
DROP TABLE IF EXISTS Homework;

-- Create the Homework table with correct structure matching the model
CREATE TABLE Homework (
  homework_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  subject VARCHAR(100) NOT NULL,
  class_name VARCHAR(100) NOT NULL,
  teacher_id INT NOT NULL,
  due_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample homework assignments
INSERT INTO Homework (title, description, subject, class_name, teacher_id, due_date, is_active) VALUES
('Practice Letters A-Z', 'Practice writing uppercase and lowercase letters A-Z', 'English', 'KG1-A', 3, DATE_ADD(CURDATE(), INTERVAL 3 DAY), 1),
('Count to 20', 'Practice counting numbers from 1 to 20 with objects', 'Mathematics', 'KG1-A', 3, DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1),
('Draw Your Family', 'Draw a picture of your family members', 'Art', 'KG2-B', 3, DATE_ADD(CURDATE(), INTERVAL 4 DAY), 1),
('Read Story Book', 'Read the assigned story book and write a summary', 'English', 'KG1-A', 3, DATE_ADD(CURDATE(), INTERVAL 5 DAY), 1),
('Basic Addition', 'Practice addition problems 1+1 to 5+5', 'Mathematics', 'KG2-B', 3, DATE_ADD(CURDATE(), INTERVAL 3 DAY), 1),
('Color Recognition', 'Identify and color different shapes', 'Art', 'KG1-A', 3, DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1);

-- Show the results
SELECT 'Homework table recreated with correct structure!' as status;
SELECT COUNT(*) as homework_count FROM Homework WHERE is_active = 1;
SELECT homework_id, title, subject, class_name, due_date FROM Homework WHERE is_active = 1 LIMIT 3;
