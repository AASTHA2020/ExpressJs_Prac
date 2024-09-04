const express = require('express');
const app = express();
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.render('index');
});


app.post('/create', (req, res) => {
    let {username, email, password, age} = req.body;

   bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let createdUser = await userModel.create({
            username: username,
            email: email,
            password: hash,
            age: age
        })
        let token = jwt.sign({email}, "shhhhhhh" );
        res.cookie("jwt", token);

        res.send(createdUser);
      });
   });
});

app.get('/login', async (req, res) => {
  res.render('login');
})

app.post('/login', async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.send("Something went wrong");
  
    bcrypt.compare(req.body.password, user.password, (err, result) => { // yahan par `)` add karna tha
      if (result) {
        res.send("Yes, you can login");
      } else {
        res.send("Password did not match");
      }
    });
  });
  
app.get("/logout", function(req, res){
  res.cookie("token", "");
  res.redirect("/");
})


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
