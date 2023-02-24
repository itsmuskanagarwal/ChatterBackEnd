const express = require('express'); 
const userRoute = express();
const registerUser=require('../controller/SignUpController')
const verifyUser=require("../controller/LoginController")
const chatStore=require("../controller/chatController")
const User=require('../model/user')
cors = require('cors');
userRoute.use(cors());


// Add User
userRoute.post('/add-user',registerUser.registerUser);
//userRoute.post('/register',registerUser.registerUser);


// verify a user
userRoute.post('/login',verifyUser.verifyUser);


 
// Get users
userRoute.get('/find-users',(req, res) => {
    User.find({}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
 
// // Update user

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

//Chat new msgs
userRoute.post('/chat-new-msgs',chatStore.newMessage);

//Chat prev msgs
userRoute.post('/chat-all-msgs',chatStore.prevMessages);

//Send msgs
userRoute.post('/chat-send',chatStore.storeMessage);

 
module.exports = userRoute;