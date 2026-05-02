const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, { dialect: 'postgres', logging: false });

const GuardianRegistrationModel = sequelize.define('GuardianRegistration', {
  registrationId: { type: DataTypes.INTEGER, primaryKey: true, field: 'registration_id', autoIncrement: true },
  fullName: { type: DataTypes.STRING, field: 'full_name' }, email: { type: DataTypes.STRING }, phoneNo: { type: DataTypes.STRING, field: 'phone_no' },
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
    const registration = await GuardianRegistrationModel.create({
      fullName: 'Test User',
      email: 'test' + Date.now() + '@abc.com',
      phoneNo: '+251911223344',
      passwordHash: 'hash',
      nationalId: '12345678',
      studentName: 'Sara Solomon',
      relationshipType: 'parent',
      certificateDocumentPath: 'uploads/docs/cert.pdf',
      idFrontPath: 'uploads/docs/front.jpg',
      idBackPath: 'uploads/docs/back.jpg',
      status: 'pending',
      correctionAttempts: 2,
      createdAt: new Date()
    });
    console.log('Reg created:', registration.registrationId);
  } catch(e) {
    console.log('Error:', e.message);
  }
  process.exit();
}
check();
