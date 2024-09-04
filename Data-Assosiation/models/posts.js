const mongoose = require('mongoose');

// No need to reconnect to MongoDB here, connection should be managed in one place (e.g., app.js)

const postSchema = new mongoose.Schema({
    postdata: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    age: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);
