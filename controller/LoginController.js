const User = require("../model/user");
const bcrypt = require("bcryptjs");

// Authenticating a user
const verifyUser = async (req, res) => {
  try {

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    //console.log(hash)

    const results = await User.find({ email: req.body.email }); //retrieves all documents that match the provided email address
    //console.log(results)

    let isAuthenticated = false;

    for (let i = 0; i < results.length; i++) {
      if (await bcrypt.compare(req.body.password, results[i].password)) { //If a match is found, isAuthenticated = true
        isAuthenticated = true;
        res.json(results[i]); //sends the user data as a JSON response
        break;
      }
    }

    //If no match is found
    if (!isAuthenticated) {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (err) {
    res.send("Error: " + err);
  }
};

module.exports = {
  verifyUser,
};
