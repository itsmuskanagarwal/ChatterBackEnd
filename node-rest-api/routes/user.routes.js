const express = require('express'); 
const userRoute = express();
const registerUser=require('../controller/SignUpController')
cors = require('cors');
userRoute.use(cors());


// Add User
userRoute.get('/add-user',(req, res) => {
    res.render('add-user');
});

userRoute.post('/add-user',registerUser.registerUser);
//userRoute.post('/register',registerUser.registerUser);

 
// // Get all Users
// userRoute.route('/').get((req, res) => {
//     User.find((error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//       console.log('Users found!')
//     }
//   })
// })
 
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