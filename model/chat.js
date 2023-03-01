const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  people: [
    {
      type: String,
      required: false,
    },
  ],

  //An array of message objects
  messages: [
    {
      message: { type: String }, //message text
      timestamp: {               //the time the message was sent
        type: Date,
        default: Date.now,
      },
      sender: {
        type: String,
        required: true,
      },
      // deliveryStatus: {
      //   type: String,
      //   enum: ['delivered', 'not delivered'],
      //   default: 'not delivered'
      // }
    },
  ],
});

module.exports = mongoose.model("chats", chatSchema);
