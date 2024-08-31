const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  img: String
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
