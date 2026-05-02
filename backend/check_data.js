const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, { dialect: 'postgres', logging: false });

async function check() {
  try {
    await sequelize.authenticate();
    console.log('--- CLASSROOMS ---');
    const [classrooms] = await sequelize.query('SELECT * FROM "Classrooms"');
    console.log(classrooms);
    
    console.log('--- USERS (TEACHERS) ---');
    const [teachers] = await sequelize.query("SELECT user_id, full_name, role FROM users WHERE role IN ('teacher', 'homeroom_teacher')");
    console.log(teachers);
    
    console.log('--- STUDENTS ---');
    const [students] = await sequelize.query('SELECT student_id, full_name, class_id FROM "Students"');
    console.log(students);
  } catch(e) {
    console.log('Error:', e.message);
  }
  process.exit();
}
check();
