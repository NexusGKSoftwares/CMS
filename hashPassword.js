const bcrypt = require('bcryptjs');

const password = 'password123'; // The plain text password
const saltRounds = 10; // The number of rounds to hash the password

// Hash the password
bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hash);
  }
});
