const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let user = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  contact: {
    type: String
  },
  password: {
    type: String
  }
}, {
  collection: 'users'
})

 
module.exports = mongoose.model('user', user)
