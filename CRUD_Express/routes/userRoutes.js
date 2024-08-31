const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('show', { users });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST new user
router.post('/', async (req, res) => {
    try {
        const { name, email, img } = req.body;
        const newUser = new User({ name, email, img });
        await newUser.save();
        res.redirect('/users');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET user edit form
router.get('/:id/edit', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render('edit', { user });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const { name, email, img } = req.body;
        await User.findByIdAndUpdate(req.params.id, { name, email, img });
        res.redirect('/users');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/users');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
