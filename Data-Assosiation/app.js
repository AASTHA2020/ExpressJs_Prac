const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/posts');
const user = require('./models/user');



app.get('/', (req, res) => {
    res.send("Home Page");
});

app.get('/create', (req, res) => {
    userModel.create({
        username: "John",
        email: "john@gmail.com",
        posts: [],
        age: 25
    }).then(user => {
        console.log(user);
        res.send(user);
    }).catch(err => {
        console.log(err);
    });
});


app.listen(8080, () => {
    console.log("Server is running on port 8080");
});