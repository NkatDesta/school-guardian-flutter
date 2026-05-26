import { sequelize, connectDatabase } from './src/database/connection';
import { StudentModel } from './src/models/Student';
import { ClassroomModel } from './src/models/Classroom';
import { UserModel } from './src/models/User';

async function main() {
  try {
    console.log('Connecting to database...');
    await connectDatabase();

    // 1. Check if Classrooms exist
    let classroom = await ClassroomModel.findOne();
    if (!classroom) {
      console.log('No classrooms found. Checking for a teacher user to create one...');
      let teacher = await UserModel.findOne({ where: { role: 'teacher' } });
      if (!teacher) {
        console.log('No teacher user found. Finding any user...');
        teacher = await UserModel.findOne();
      }

      if (!teacher) {
        throw new Error('Cannot create classroom: no users exist in the database. Please register a teacher first.');
      }

      console.log(`Creating a default Classroom for teacher ID: ${teacher.userId}`);
      classroom = await ClassroomModel.create({
        teacherId: teacher.userId,
        classLevel: 'KG-1',
        homeroomTeacherId: teacher.userId,
        academicYear: '2026'
      });
    }

    console.log(`Using Classroom: ID ${classroom.classId} (${classroom.classLevel})`);

    // 2. Check if student already exists
    const existingStudent = await StudentModel.findOne({
      where: { fullName: 'welebe kebede' }
    });

    if (existingStudent) {
      console.log(`Student "welebe kebede" already exists with ID: ${existingStudent.studentId}`);
    } else {
      console.log('Inserting student "welebe kebede"...');
      const student = await StudentModel.create({
        fullName: 'welebe kebede',
        dob: new Date('2020-05-15'), // default date of birth
        emergencyContact: '+251911223344',
        classId: classroom.classId,
        guardianId: null
      });
      console.log(`Success! Created student "welebe kebede" with ID: ${student.studentId}`);
    }

  } catch (error) {
    console.error('Error adding student:', error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

main();
