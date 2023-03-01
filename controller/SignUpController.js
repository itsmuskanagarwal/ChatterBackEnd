const User = require("../model/user");
const bcrypt = require("bcryptjs");

//Registering a new user 
const registerUser = async (req, res) => {
const hash='';  
  //Password Hashing
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;
      this.hash = hash;
    })
  );

  //Confirm Passwords

  try {
    //add new user
    const user =await new User({
      name: req.body.username,
      contact: req.body.contact,
      email: req.body.email,
      password: this.hash,
      displayname: req.body.username,
    });

    const token = await user.generateAuthToken();
    console.log("signin:"+token)

    res.cookie("jwt", token,{
      expires: new Date(Date.now() + 30000),
      httpOnly: true
    });

    const result = await user.save();
    console.log(result)
    res.json({success:result});
  } catch (err) {
    res.send({Error:err});
  }
};

module.exports = {
  registerUser,
};
