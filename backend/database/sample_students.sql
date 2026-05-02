-- Allow students to exist without a guardian temporarily
ALTER TABLE Students ALTER COLUMN guardian_id DROP NOT NULL;

-- Insert sample students that parents can "claim" during registration
INSERT INTO Students (guardian_id, class_id, full_name, dob, emergency_contact) VALUES
(NULL, (SELECT class_id FROM Classrooms LIMIT 1), 'Abebe Bikila', '2017-05-12', '0911000001'),
(NULL, (SELECT class_id FROM Classrooms LIMIT 1), 'Sara Solomon', '2018-03-22', '0911000002'),
(NULL, (SELECT class_id FROM Classrooms LIMIT 1), 'Dawit Haile', '2017-11-05', '0911000003'),
(NULL, (SELECT class_id FROM Classrooms LIMIT 1), 'Martha Kebede', '2019-01-15', '0911000004'),
(NULL, (SELECT class_id FROM Classrooms LIMIT 1), 'Samuel Yosef', '2018-08-30', '0911000005');
