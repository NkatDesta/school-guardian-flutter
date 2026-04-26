const bcrypt = require('bcryptjs');

async function generatePasswordHashes() {
  const passwords = {
    'director123': 'director@school.com',
    'registrar456': 'registrar@school.com', 
    'teacher789': 'teacher@school.com',
    'homeroom012': 'homeroom@school.com',
    'password': 'guardian@example.com'
  };

  console.log('-- Generated password hashes:');
  console.log('-- Run this SQL to update the database:');
  console.log('DELETE FROM Users WHERE email IN (');
  console.log('  \'director@school.com\',');
  console.log('  \'registrar@school.com\',');
  console.log('  \'teacher@school.com\',');
  console.log('  \'homeroom@school.com\'');
  console.log(');');
  console.log();

  for (const [password, email] of Object.entries(passwords)) {
    const hash = await bcrypt.hash(password, 12);
    const role = email.includes('director') ? 'director' : 
                  email.includes('registrar') ? 'registrar' :
                  email.includes('teacher') ? 'homeroom_teacher' : 'guardian';
    const fullName = email.includes('director') ? 'School Director' :
                     email.includes('registrar') ? 'School Registrar' :
                     email.includes('teacher') && email.includes('homeroom') ? 'Mr. Johnson Homeroom' :
                     email.includes('teacher') ? 'Ms. Smith Teacher' : 'John Doe';
    const phone = email.includes('director') ? '251911111111' :
                  email.includes('registrar') ? '251911222222' :
                  email.includes('teacher') && email.includes('homeroom') ? '251911444444' :
                  email.includes('teacher') ? '251911333333' : '251911555555';

    console.log(`INSERT INTO Users (email, password_hash, role, full_name, phone_no, address) VALUES`);
    console.log(`('${email}', '${hash}', '${role}', '${fullName}', '${phone}', 'School Address');`);
    console.log();
  }
}

generatePasswordHashes().catch(console.error);
