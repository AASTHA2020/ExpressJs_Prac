const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to show all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.render('show', { users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Server Error');
  }
});

// Route to show form to add a new user
router.get('/', (req, res) => {
  res.render('index');
});

// Route to add a new user
router.post('/users', async (req, res) => {
  const { name, email, image } = req.body;
  const user = new User({
    name,
    email,
    img: image // Ensure the key matches your schema
  });
  
  try {
    await user.save();
    res.redirect('/users');
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).send('Server Error');
  }
});

// Route to show form to edit a user
router.get('/users/:id/edit', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('show', { user });
  } catch (err) {
    console.error('Error fetching user for edit:', err);
    res.status(500).send('Server Error');
  }
});

// Route to update a user
router.put('/users/:id', async (req, res) => {
  const { name, email, image } = req.body;
  try {
    await User.findByIdAndUpdate(req.params.id, {
      name,
      email,
      img: image
    });
    res.redirect('/users');
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).send('Server Error');
  }
});

// Route to delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
