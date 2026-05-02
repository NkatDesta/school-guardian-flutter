const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, { dialect: 'postgres', logging: false });
const GuardianRegistrationModel = sequelize.define('GuardianRegistration', {
  registrationId: { type: DataTypes.INTEGER, primaryKey: true, field: 'registration_id', autoIncrement: true },
  fullName: { type: DataTypes.STRING, field: 'full_name' }, email: { type: DataTypes.STRING, unique: true }, phoneNo: { type: DataTypes.STRING, field: 'phone_no' },
  passwordHash: { type: DataTypes.STRING, field: 'password_hash' }, nationalId: { type: DataTypes.STRING, field: 'national_id' },
  studentName: { type: DataTypes.STRING, field: 'student_name' }, relationshipType: { type: DataTypes.STRING, field: 'relationship_type' },
  certificateDocumentPath: { type: DataTypes.STRING, field: 'certificate_document_path' },
  idFrontPath: { type: DataTypes.STRING, field: 'id_front_path' }, idBackPath: { type: DataTypes.STRING, field: 'id_back_path' },
  status: { type: DataTypes.STRING }, correctionAttempts: { type: DataTypes.INTEGER, field: 'correction_attempts' },
  createdAt: { type: DataTypes.DATE, field: 'created_at' }
}, { tableName: 'GuardianRegistrations', timestamps: false, underscored: true });

async function check() {
  try {
    await sequelize.authenticate();
    await GuardianRegistrationModel.create({
      fullName: 'Test User', email: 'dup@abc.com', phoneNo: '+111', passwordHash: 'hash', nationalId: '111',
      studentName: 'Sara Solomon', relationshipType: 'parent',
      certificateDocumentPath: 'a', idFrontPath: 'b', idBackPath: 'c', status: 'pending', correctionAttempts: 2, createdAt: new Date()
    });
    console.log('1 OK');
    await GuardianRegistrationModel.create({
      fullName: 'Test User 2', email: 'dup@abc.com', phoneNo: '+222', passwordHash: 'hash', nationalId: '222',
      studentName: 'Sara Solomon', relationshipType: 'parent',
      certificateDocumentPath: 'a', idFrontPath: 'b', idBackPath: 'c', status: 'pending', correctionAttempts: 2, createdAt: new Date()
    });
    console.log('2 OK');
  } catch(e) {
    console.log('Error Name:', e.name);
  }
  process.exit();
}
check();
