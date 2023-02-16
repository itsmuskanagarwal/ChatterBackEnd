const express = require('express');
const user = require('../model/user');
const app = express();
 
const userRoute = express.Router();
let User = require('../model/user');
 
// Add User
userRoute.route('/add-user').post((req, res, next) => {
    User.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      console.log('User added successfully!')
    }
  })
});
 
// Get all Users
userRoute.route('/').get((req, res) => {
    User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      console.log('Users found!')
    }
  })
})
 
// Get 1 user
userRoute.route('/user/:id').get((req, res) => {
    User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
 
// Update user
userRoute.route('/update-user/:id').put((req, res, next) => {
    User.findUserAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('User updated successfully!')
    }
  })
})
 
 
module.exports = userRoute;