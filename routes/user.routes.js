const express = require("express");
const userRoute = express();
const registerUser = require("../controller/SignUpController");
const verifyUser = require("../controller/LoginController");
const chatStore = require("../controller/chatController");
// const profilePicture = require("../controller/profileController")
const submitQuery =  require("../controller/queryController")
const User = require("../model/user");


cors = require("cors");  //for handling Cross-Origin Resource Sharing (CORS) issues
userRoute.use(cors());

// Add User
userRoute.post("/add-user", registerUser.registerUser);

// verify a user
userRoute.post("/login", verifyUser.verifyUser);

// Add query
userRoute.post("/add-query", submitQuery.submitQuery);

// Get users
userRoute.get("/find-users", (req, res) => {
  User.find({}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Chat count
userRoute.post("/chat-count", chatStore.chatCount);

// update status of delivery
userRoute.post("/update-status", chatStore.updateStatus);

// Get user's avatar
userRoute.get("/find-user-avatar", (req, res) => {

  // res.set('Content-Type', 'text/plain');

  User.findOne({ email: req.query.email }, 'profilePicture', (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log("find avatar"+data)
      res.json(data);
    }
  });
});


//Updates a user's information in the database 
userRoute.put("/update-user", (req, res, next) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: req.body,
      
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        console.log(data)
        console.log( req.body.email)
        res.json(data);
        console.log("User updated successfully!");
      }
    }
  );
});

//Updates a user's avatar
userRoute.put("/update-avatar", (req, res, next) => {
  console.log("body"+req.body)
  
  User.findOneAndUpdate(
    { email: req.body.email },
    { $set: { profilePicture: req.body.url } },
    { new: true },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("data"+data)
      }
    }
  );

});

//Retrieve all previous messages 
userRoute.post("/chat-all-msgs", chatStore.prevMessages);

module.exports = userRoute;
