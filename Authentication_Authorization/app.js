
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// app.get('/', (req, res) => {
//    bcrypt.genSalt(10, function(err, salt){
//     bcrypt.hash("polololoooo", salt, function(err, hash){
//         console.log(hash);
//     });
//    });

// });


app.get("/", function(req, res){
    let token = jwt.sign({email: "missaastha11@gmail.com"}, "secret");
    res.cookie("token", token);
    res.send("hello");
    console.log(token);

})



app.listen(3000, () => {
  console.log('Server started on port 3000');
});