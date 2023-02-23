const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
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

const Chat = mongoose.model('Chat', chatSchema);
