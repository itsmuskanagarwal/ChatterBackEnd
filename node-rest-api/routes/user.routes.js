const express = require('express'); 
const userRoute = express();
const registerUser=require('../controller/SignUpController')
const verifyUser=require("../controller/LoginController")
const User=require('../model/user')
cors = require('cors');
userRoute.use(cors());


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


 
// // Get 1 user
// userRoute.route('/user/:id').get((req, res) => {
//     User.findById(req.params.id, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })
 
// // Update user
// userRoute.route('/update-user/:id').put((req, res, next) => {
//     User.findUserAndUpdate(req.params.id, {
//     $set: req.body
//   }, (error, data) => {
//     if (error) {
//       return next(error);
//       console.log(error)
//     } else {
//       res.json(data)
//       console.log('User updated successfully!')
//     }
//   })
// })
 
 
module.exports = userRoute;