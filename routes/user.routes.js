const express = require("express");
const userRoute = express();
const registerUser = require("../controller/SignUpController");
const verifyUser = require("../controller/LoginController");
const chatStore = require("../controller/chatController");
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
        res.json(data);
        console.log("User updated successfully!");
      }
    }
  );
});

//Retrieve all previous messages 
userRoute.post("/chat-all-msgs", chatStore.prevMessages);

module.exports = userRoute;
