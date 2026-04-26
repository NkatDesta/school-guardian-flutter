-- Check if sample data was added successfully
SELECT '=== GUARDIAN DATA ===' as section;
SELECT u.user_id, u.full_name, u.email, u.role FROM Users u WHERE u.full_name = 'welebe kebede';

SELECT '=== STUDENTS ASSIGNED TO GUARDIAN ===' as section;
SELECT s.student_id, s.full_name, s.grade, s.class_name, s.guardian_id 
FROM Students s 
WHERE s.guardian_id = (SELECT user_id FROM Users WHERE full_name = 'welebe kebede');

SELECT '=== NOTIFICATIONS ===' as section;
SELECT n.title, n.content, n.recipient_group, n.sent_at 
FROM Notifications n 
ORDER BY n.sent_at DESC 
LIMIT 3;

SELECT '=== HOMEWORK ===' as section;
SELECT h.title, h.subject, h.class_name, h.due_date, h.is_active 
FROM Homework h 
WHERE h.is_active = 1 
ORDER BY h.due_date ASC 
LIMIT 3;

SELECT '=== PICKUP REQUESTS ===' as section;
SELECT pr.student_id, pr.authorized_person, pr.relationship, pr.pickup_time, pr.status, pr.request_date 
FROM Pickup_Requests pr 
WHERE pr.guardian_id = (SELECT user_id FROM Users WHERE full_name = 'welebe kebede')
ORDER BY pr.request_date DESC 
LIMIT 3;
