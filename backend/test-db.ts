import { connectDatabase } from './src/database/connection';

async function testConnection() {
  try {
    await connectDatabase();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Failed to connect:', error);
  }
}

testConnection();