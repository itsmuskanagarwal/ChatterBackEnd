const User = require("../model/user");
const bcrypt = require("bcryptjs");
const registerUser = async(req, res) => {
    
    //Confirm Passwords
    try{
      //add new user
      const user=new User({
        name:req.body.username,
        contact:req.body.contact,
        email:req.body.email,
        password:req.body.password
      })

      const result=await user.save();
      res.send("Registration Successful"+result);

      //Validation
      // User.findOne({ "name": name }).then((user) => {
      //   if (user) {
      //     console.log("user exists");
      //     res.render("add-user", {
      //       name,
      //       email,
      //       contact,
      //       password,
      //       displayname
      //     });
      //   } else {
      //     //Validation
      //     const newUser = new User({
      //       name,
      //       email,
      //       contact,
      //       password,
      //       displayname
      //     });
    }catch(err){
      res.send("Error"+err);
    }
          //Password Hashing
          // bcrypt.genSalt(10, (err, salt) =>
          //   bcrypt.hash(newUser.password, salt, (err, hash) => {
          //     if (err) throw err;
          //     newUser.password = hash;
          //     newUser
          //       .save()
          //       // .then(res.redirect("/login"))
          //       .catch((err) => console.log(err));
          //   })
          // );
        }

        module.exports={
          registerUser
        }