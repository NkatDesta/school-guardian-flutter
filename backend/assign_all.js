const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, { dialect: 'postgres', logging: false });
async function run() {
  try {
    await sequelize.authenticate();
    console.log('Assigning classes to all teachers for testing...');
    // Update all classrooms to be assigned to all teachers (or just find the first few)
    const [teachers] = await sequelize.query(\"SELECT user_id FROM users WHERE role LIKE '%teacher%'\");
    if (teachers.length > 0) {
      const teacherId = teachers[0].user_id;
      await sequelize.query('UPDATE \"Classrooms\" SET teacher_id = ?, homeroom_teacher_id = ?', {
        replacements: [teacherId, teacherId]
      });
      console.log('Successfully assigned classrooms to Teacher ID:', teacherId);
    } else {
      console.log('No teachers found to assign!');
    }
  } catch(e) { console.log('Error:', e.message); }
  process.exit();
}
run();
