const express = require('express'); // Import express module
const path = require('path'); // Import path module to handle file paths
const app = express(); // Initialize an Express application

// In-memory task list
let tasks = ["Buy groceries", "Clean the house", "Study Express.js"]; // Sample tasks

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data from the body of requests
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files (CSS, JavaScript) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to 'ejs' for rendering HTML templates
app.set('view engine', 'ejs');

// Route handler for the root path ('/')
app.get('/', function (req, res) {
    res.render('index', { tasks }); // Pass tasks to the template
});

// Route to handle adding a new task
app.post('/add', function (req, res) {
    const newTask = req.body.task; // Get task from request body
    console.log('POST /add - Received new task:', newTask);
    if (newTask) {
        tasks.push(newTask); // Add new task to the list
        console.log('POST /add - New task added:', newTask);
    } else {
        console.log('POST /add - No task provided.');
    }
    res.redirect('/'); // Redirect to the homepage
});

// Route to handle deleting a task
app.post('/delete', function (req, res) {
    const taskIndex = req.body.index; // Get task index from request body
    if (taskIndex !== undefined) {
        tasks.splice(taskIndex, 1); // Remove the task from the list
    }
    res.redirect('/'); // Redirect to the homepage
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
