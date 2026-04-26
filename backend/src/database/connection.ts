import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME || 'digital_school_db',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    connectTimeout: 10000,
    acquireTimeout: 10000,
    timeout: 10000,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 20000,
    idle: 5000,
    evict: 1000,
  },
  define: {
    timestamps: true,
    underscored: false,
    createdAt: 'createdAt',
    updatedAt: false,
  },
  retry: {
    max: 3,
    timeout: 5000,
  },
});

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Initialize model associations (lazy loaded to avoid circular imports)
    const { initSystemLogAssociations } = require('../models/SystemLog');
    const { initClassroomAssociations } = require('../models/Classroom');
    const { initStudentAssociations } = require('../models/Student');
    
    initSystemLogAssociations();
    initClassroomAssociations();
    initStudentAssociations();
    
    // Ensure new models are loaded for sync
    require('../models/OTP');
    require('../models/PendingRegistration');

    console.log('Model associations initialized.');
    
    // Sync database models
    if (process.env.NODE_ENV === 'development') {
      // sync() creates tables if they don't exist, leaves existing data untouched
      await sequelize.sync();
      console.log('Database synchronized successfully.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await sequelize.close();
    console.log('Database connection closed successfully.');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
};
