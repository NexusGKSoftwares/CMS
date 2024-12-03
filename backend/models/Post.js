// models/Post.js

const mongoose = require('mongoose');

// Define the schema for a blog post
const PostSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    slug: { 
        type: String, 
        required: true, 
        unique: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        default: ''  // Default to an empty string if no image is provided
    },
    createdAt: { 
        type: Date, 
        default: Date.now  // Automatically set the creation date to the current date
    }
});

// Create and export the Post model
module.exports = mongoose.model('Post', PostSchema);
