const User = require("../model/user");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  //Password Hashing
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;
      password = hash;
    })
  );

  //Confirm Passwords

  try {
    //add new user
    const user = new User({
      name: req.body.username,
      contact: req.body.contact,
      email: req.body.email,
      password: password,
      displayname: req.body.username,
    });

    const result = await user.save();
    res.send("Registration Successful" + result);
  } catch (err) {
    res.send("Error" + err);
  }
};

module.exports = {
  registerUser,
};
