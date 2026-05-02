const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, { dialect: 'postgres', logging: false });

async function check() {
  try {
    await sequelize.authenticate();
    console.log('--- CLASSROOMS ---');
    const [classrooms] = await sequelize.query('SELECT * FROM "Classrooms"');
    console.log(classrooms);
    
    console.log('--- STUDENTS ---');
    const [students] = await sequelize.query('SELECT * FROM "Students"');
    console.log(students);
    
    console.log('--- ALL TABLES ---');
    const [tables] = await sequelize.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
    console.log(tables.map(t => t.table_name).filter(n => n.toLowerCase().includes('student') || n.toLowerCase().includes('class')));
  } catch(e) {
    console.log('Error:', e.message);
  }
  process.exit();
}
check();
