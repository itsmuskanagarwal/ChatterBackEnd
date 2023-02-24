const Message = require("../model/chat");

// get all messages sent and received between sender and reciever
const prevMessages = async (req, res) => {
  try {
    console.log(req.body);
    const previousMsg=Message.find({
      $and: [
        {
          $or: [
            { sender: req.body.currentUser, receiver: req.body.selectedUser },
            { sender: req.body.selectedUser, reciever: req.body.currentUser },
          ],
        },
        { deliveryStatus: "delivered" },
      ],
    });
    res.json(previousMsg);
  } catch (err) {
    res.send("Error: " + err);
  }
};

const newMessage = async (req, res) => {
  try {
    console.log(req.body);
    const newMsg=Message.find({
      $and: [
        { sender: req.body.selectedUser, reciever: req.body.currentUser },
        { deliveryStatus: "not delivered" },
      ],
    });
    res.json(newMsg);
  } catch (err) {
    res.send("Error: " + err);
  }
};

const storeMessage = async (req, res) => {
    console.log(req.body);
    try {
    // if (req) {
      // store message in database
      const message = new Message({
        sender: req.body.currentUser,
        receiver: req.body.selectedUser,
        message: req.body.message,
        deliveryStatus: "delivered"
      })
      const result =await message.save();
      res.send("Message Save"+result);
    // } else {
    // //   recipient is offline, store message in database
    //   const message = new Message({
    //     sender: req.body.currentUser,
    //     receiver: req.body.selectedUser,
    //     message: req.body.message,
    //     deliveryStatus: "not delivered" // set isDelivered flag to false
    //   });
    //   message.save();
    //  }
} catch (err) {
    res.send("Error: " + err);
  }
};


module.exports = {
  newMessage,
  prevMessages,
  storeMessage
};
