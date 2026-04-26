# Database Setup Instructions

## Prerequisites
- MySQL 8.0+ installed and running
- MySQL command line tools available

## Setup Steps

### 1. Create Database
```bash
# Connect to MySQL as root
mysql -u root -p

# Run the schema file
source /path/to/backend/database/schema.sql
```

### 2. Verify Database Creation
```sql
-- Check if database was created
SHOW DATABASES;

-- Use the database
USE digital_school_db;

-- Check tables
SHOW TABLES;

-- Verify sample data
SELECT * FROM Users LIMIT 5;
```

### 3. Update Environment Variables
Copy `.env.example` to `.env` and update:
```bash
DB_HOST=localhost
DB_PORT=3306
DB_NAME=digital_school_db
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
```

### 4. Test Connection
Run the backend server to test database connection:
```bash
cd backend
npm install
npm run dev
```

## Database Schema Overview

### Core Tables
- **Users**: System users with roles and authentication
- **GuardianRegistration**: Guardian approval workflow
- **Classrooms**: School classes and assignments
- **Students**: Student information and relationships

### Communication Tables
- **Messages**: Internal messaging system
- **Notifications**: System-wide announcements
- **NotificationDelivery**: Notification tracking

### Academic Tables
- **Homework**: Assignment management
- **HomeworkTracking**: Viewing and feedback tracking
- **ReportCards**: Academic performance records

### Safety Tables
- **PickupRequests**: Student pickup authorization
- **SystemLogs**: Audit trail for all actions

### Views and Procedures
- **GuardianStudents**: Combined guardian-student view
- **UnreadMessages**: Unread messages view
- **PendingNotifications**: Pending notifications view
- **Stored Procedures**: Common data operations

## Security Notes
- All passwords are hashed using bcrypt
- Foreign key constraints ensure data integrity
- Audit logging tracks all critical actions
- Role-based access enforced at application level

## Performance Considerations
- Indexed columns for common queries
- JSON fields for flexible data storage
- Views for complex queries
- Stored procedures for repeated operations
