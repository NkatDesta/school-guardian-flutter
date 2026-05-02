const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, { dialect: 'postgres', logging: false });

const GuardianRegistrationModel = sequelize.define('GuardianRegistration', {
  registrationId: { type: DataTypes.INTEGER, primaryKey: true, field: 'registration_id' },
  fullName: { type: DataTypes.STRING, field: 'full_name' }, email: { type: DataTypes.STRING }, phoneNo: { type: DataTypes.STRING, field: 'phone_no' },
  passwordHash: { type: DataTypes.STRING, field: 'password_hash' }, nationalId: { type: DataTypes.STRING, field: 'national_id' },
  status: { type: DataTypes.STRING }, studentId: { type: DataTypes.INTEGER, field: 'student_id' },
  reviewedBy: { type: DataTypes.INTEGER, field: 'reviewed_by' }, reviewedAt: { type: DataTypes.DATE, field: 'reviewed_at' }
}, { tableName: 'GuardianRegistrations', timestamps: false });

const UserModel = sequelize.define('User', {
  userId: { type: DataTypes.INTEGER, primaryKey: true, field: 'user_id', autoIncrement: true },
  email: { type: DataTypes.STRING }, passwordHash: { type: DataTypes.STRING, field: 'password_hash' },
  role: { type: DataTypes.STRING }, fullName: { type: DataTypes.STRING, field: 'full_name' },
  phoneNo: { type: DataTypes.STRING, field: 'phone_no' }, address: { type: DataTypes.STRING },
  nationalId: { type: DataTypes.STRING, field: 'national_id' }, isActive: { type: DataTypes.BOOLEAN, field: 'is_active' },
  createdAt: { type: DataTypes.DATE, field: 'created_at' }
}, { tableName: 'users', timestamps: false, underscored: true });

const StudentModel = sequelize.define('Student', {
  studentId: { type: DataTypes.INTEGER, primaryKey: true, field: 'student_id' },
  guardianId: { type: DataTypes.INTEGER, field: 'guardian_id' },
}, { tableName: 'Students', timestamps: false, underscored: true });

async function check() {
  try {
    await sequelize.authenticate();
    const registration = await GuardianRegistrationModel.findByPk(2); // "Case Review #2"
    if(!registration) return console.log("No reg found");
    
    console.log("Found reg:", registration.email);
    const user = await UserModel.create({
      email: registration.email,
      passwordHash: registration.passwordHash,
      role: 'guardian',
      fullName: registration.fullName,
      phoneNo: registration.phoneNo,
      address: '',
      nationalId: registration.nationalId,
      isActive: true,
      createdAt: new Date()
    });
    console.log("User created:", user.userId);
    
    const student = await StudentModel.findByPk(3); // Sara Solomon is student_id 3
    if(!student) return console.log("No student 3 found");
    await student.update({ guardianId: user.userId });
    console.log("Student updated");
    
    await registration.update({
      status: 'approved',
      studentId: student.studentId,
      reviewedBy: 1,
      reviewedAt: new Date()
    });
    console.log("Reg updated");
  } catch(e) {
    console.log('Approve Error:', e);
  }
  process.exit();
}
check();
