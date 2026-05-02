const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, { dialect: 'postgres', logging: false });
async function check() {
  try {
    await sequelize.authenticate();
    const [allClasses] = await sequelize.query('SELECT * FROM \"Classrooms\"');
    console.log('ALL CLASSROOMS:', allClasses);
    const [allTeachers] = await sequelize.query(\"SELECT user_id, full_name, role FROM users WHERE role LIKE '%teacher%'\");
    console.log('ALL TEACHERS:', allTeachers);
  } catch(e) { console.log('Error:', e.message); }
  process.exit();
}
check();
