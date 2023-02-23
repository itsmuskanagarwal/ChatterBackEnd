const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  deliveryStatus: {
    type: String,
    enum: ['delivered', 'not delivered'],
    default: 'not delivered'
  }
});

module.exports = mongoose.model('chats', chatSchema)