const express = require('express'); 
const userRoute = express();
const registerUser=require('../controller/SignUpController')
const verifyUser=require("../controller/LoginController")
const User=require('../model/user')
cors = require('cors');
userRoute.use(cors());


// socket.io
// userRoute.get('/socket.io',(req, res) => {
//   //res.render('add-user');
// });

// Add User
userRoute.get('/add-user',(req, res) => {
    //res.render('add-user');
});

userRoute.post('/add-user',registerUser.registerUser);
//userRoute.post('/register',registerUser.registerUser);


// verify a user
userRoute.get('/login',(req, res) => {
    //res.render('login');
})
userRoute.post('/login',verifyUser.verifyUser);


 
// Get users
userRoute.route('/find-users').get((req, res) => {
    User.find({}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
 
// // Update user
userRoute.get('/update-user',(req, res) => {
    //res.render('login');
});

userRoute.put('/update-user',(req, res, next) => {
    User.findOneAndUpdate({email:req.body.email}, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('User updated successfully!')
    }
  })
})
 
 
module.exports = userRoute;