const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  people: [
    {
      type: String,
      required: false,
    },
  ],
  messages: [
    {
      message: { type: String },
      timestamp: {
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
