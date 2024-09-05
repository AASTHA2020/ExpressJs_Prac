const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'data', 'users.json');

app.use(express.json());

// Helper function to read users from file
function readUsers() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return [];
    }
}

// Helper function to write users to file
function writeUsers(users) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

// Get all users
app.get('/users', (req, res) => {
    const users = readUsers();
    res.json(users);
});

// Add a new user
app.post('/users', (req, res) => {
    const users = readUsers();
    const newUser = req.body;
    users.push(newUser);
    writeUsers(users);
    res.status(201).json(newUser);
});

// Update an existing user
app.put('/users/:id', (req, res) => {
    const users = readUsers();
    const userId = req.params.id;
    const updatedUser = req.body;
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        writeUsers(users);
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    const users = readUsers();
    const userId = req.params.id;
    const newUsers = users.filter(user => user.id !== userId);
    if (users.length !== newUsers.length) {
        writeUsers(newUsers);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
