const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, { dialect: 'postgres', logging: false });
async function run() {
  try {
    await sequelize.authenticate();
    console.log('Restoring old notifications...');
    
    await sequelize.query('INSERT INTO notifications (title, content, priority, sender_id, recipient_group, delivery_status, sent_at, created_at) VALUES ' + 
      '(\'welebe\', \'whatjjjdjkkfkdfj.dklglkdfgf jjkdfkgkldflkgldfgklfdl\', \'normal\', 1, \'all_guardians\', \'sent\', NOW(), NOW()), ' +
      '(\'nikat\', \'hadshdhksjfjsdjasjkdkllakskdlaskdksakdhsbfhsdvbcbdvscbx bcbxvcbnchdh\', \'normal\', 1, \'all_guardians\', \'sent\', NOW(), NOW()), ' +
      '(\'test\', \'this is test at deploy\', \'normal\', 1, \'all_guardians\', \'sent\', NOW(), NOW())');

    console.log('Old notifications restored successfully!');
  } catch(e) { console.log('Error:', e.message); }
  process.exit();
}
run();
