const mongoose = require('mongoose');

// Correct MongoDB connection string
mongoose.connect('mongodb://127.0.0.1:27017/testingthedatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Connection error', err);
});

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    age: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
