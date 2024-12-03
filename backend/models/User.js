// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For password hashing

// Define the schema for a user (admin)
const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true  // Ensure usernames are unique
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['admin', 'user'],  // Only allow 'admin' or 'user' roles
        default: 'admin'  // Default role is 'admin'
    }
});

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();  // If password is not modified, skip hashing

    const salt = await bcrypt.genSalt(10);  // Generate a salt
    this.password = await bcrypt.hash(this.password, salt);  // Hash the password
    next();  // Proceed with saving the user
});

// Method to compare the entered password with the stored hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
module.exports = mongoose.model('User', UserSchema);
