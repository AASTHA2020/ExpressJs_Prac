const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase');

// Routes
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.render('index');
});
// Start server
const PORT = process.env.PORT || 6969; // Ensure this is set to 6969
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});