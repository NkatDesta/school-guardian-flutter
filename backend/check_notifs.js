const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, { dialect: 'postgres', logging: false });
async function check() {
  try {
    await sequelize.authenticate();
    const [notifs] = await sequelize.query('SELECT * FROM notifications');
    console.log('NOTIFICATIONS:', notifs);
  } catch(e) { console.log('Error:', e.message); }
  process.exit();
}
check();
