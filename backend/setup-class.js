const { sequelize } = require('./dist/database/connection');

async function setupDatabase() {
  try {
    // Create ClassAssignments table without foreign key first
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS ClassAssignments (
        assignment_id INT AUTO_INCREMENT PRIMARY KEY,
        teacher_id INT NOT NULL,
        class_id INT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_teacher_class (teacher_id, class_id)
      ) ENGINE=InnoDB
    `);
    console.log('✅ ClassAssignments table created');
    
    // Assign teacher to class
    await sequelize.query(
      'INSERT INTO ClassAssignments (teacher_id, class_id) VALUES (3, 1) ON DUPLICATE KEY UPDATE class_id = class_id'
    );
    console.log('✅ Teacher (Ms. Smith) assigned to Class 1 (Abebe Bikila class)');
    
    // Verify
    const [assignments] = await sequelize.query(
      'SELECT ca.teacher_id, ca.class_id, c.class_name FROM ClassAssignments ca JOIN Classes c ON ca.class_id = c.class_id WHERE ca.teacher_id = 3'
    );
    console.log('Teacher assignments:', assignments);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit(0);
  }
}

setupDatabase();
