const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, { dialect: 'postgres', logging: false });

const StudentModel = sequelize.define('Student', {
  studentId: { type: DataTypes.INTEGER, primaryKey: true, field: 'student_id', autoIncrement: true },
  guardianId: { type: DataTypes.INTEGER, field: 'guardian_id' },
  fullName: { type: DataTypes.STRING(100), field: 'full_name' }
}, { tableName: 'Students', timestamps: false });

async function check() {
  try {
    await sequelize.authenticate();
    const students = await StudentModel.findAll({
      where: {
        fullName: { [Op.like]: '%Sara%' },
        guardianId: null
      }
    });
    console.log('Found:', students.length);
    console.log(students.map(s => s.toJSON()));
  } catch(e) {
    console.log('Error:', e.message);
  }
  process.exit();
}
check();
