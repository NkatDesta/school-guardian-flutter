const { sequelize } = require('./dist/database/connection');

async function assignTeacherToClass() {
  try {
    // Assign teacher (Ms. Smith, userId: 3) to class 1 (Abebe Bikila's class)
    await sequelize.query(
      'INSERT INTO ClassAssignments (teacher_id, class_id) VALUES (3, 1) ON DUPLICATE KEY UPDATE class_id = class_id'
    );
    console.log('✅ Teacher assigned to Class 1 (Abebe Bikila class)');
    
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

assignTeacherToClass();
