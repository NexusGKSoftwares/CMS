const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function createAdmin() {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({ username: 'admin', password: hashedPassword });
    await admin.save();
    console.log('Admin created:', admin);
}

createAdmin();
