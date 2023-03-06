const User = require("../model/user");
const bcrypt = require("bcryptjs");

// Authenticating a user
const verifyUser = async (req, res) => {
  try {

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    //console.log(hash)

    const result = await User.findOne({ email: req.body.email }); //retrieves all documents that match the provided email address
    console.log("result"+result)

    // const token = await result.generateAuthToken();
    // console.log("login: "+ token)

    // res.cookie("jwt", token,{
    //   expires: new Date(Date.now() + 50000),
    //   httpOnly: true,
  
    // });


    // console.log("Cookie: "+req.cookie.jwt);

    let isAuthenticated = false;

      if (await bcrypt.compare(req.body.password, result.password)) { //If a match is found, isAuthenticated = true
        
        isAuthenticated = true;
        res.json(result); //sends the user data as a JSON response

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
