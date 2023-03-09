const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const { stringify } = require("circular-json");

let user = new Schema(
  {
    name: {
      type: String,
      required : true
    },
    email: {
      type: String,
      required : true
    },
    contact: {
      type: String,
      required : true
    },
    password: {
      type: String,
      required : true
    },
    displayname: {
      type: String,
    },
    profilePicture  :{
      type : String,
      default : "/assets/profile-img.jpg"
    }
  },
  {
    collection: "users",
  }
);

//Generating tokens
// user.methods.generateAuthToken =  async function(){
//   console.log("inside")
//   try{
//     console.log(this._id)
//     const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
//     console.log(token);

//     this.tokens = this.tokens.concat({token : token});
//     await this.save()
//     return token
//   }
//   catch(error){
//     res.send(error)
//     console.log("error"+error)
//   }
// }

module.exports = mongoose.model("user", user);
