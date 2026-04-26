import { sequelize } from './src/database/connection';
import { OTPModel } from './src/models/OTP';
import { PendingRegistrationModel } from './src/models/PendingRegistration';

async function createTables() {
  try {
    await sequelize.authenticate();
    console.log('DB connected.');

    // Create missing tables without touching existing data
    await OTPModel.sync({ force: false });
    console.log('OTPs table: OK');

    await PendingRegistrationModel.sync({ force: false });
    console.log('PendingRegistrations table: OK');

    // Verify
    const [results] = await sequelize.query(
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'digital_school_db' AND TABLE_NAME IN ('OTPs','PendingRegistrations') ORDER BY TABLE_NAME"
    );
    console.log('Confirmed tables:', (results as any[]).map((r: any) => r.TABLE_NAME).join(', '));

    await sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

createTables();
