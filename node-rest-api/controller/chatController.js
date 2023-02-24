const Message = require("../model/chat");
const circularJson = require('circular-json');

// get all messages sent and received between sender and reciever
const prevMessages = async (req, res) => {
  try {
    console.log("hey : ",req.body);
    const previousMsg= await Message.find({
      $and: [
        {
          $or: [
            { sender: req.body.currentUser, receiver: req.body.selectedUser },
            { sender: req.body.selectedUser, reciever: req.body.currentUser },
          ],
        },
        { deliveryStatus: "delivered" },
      ],
    },'sender receiver message ');
    // console.log("this is the console: ",json(previousMsg))
    // const userString = circularJson.stringify(previousMsg);
    // console.log(userString)
    // res.json(userString);
    console.log("previousMsg:", previousMsg);
    res.json(previousMsg);

  } catch (err) {
    console.log(err)
    res.send("Error: " + err);
  }
};

const newMessage = async (req, res) => {
  try {
    // console.log(req.body);
    const newMsg=Message.find({
      $and: [
        { sender: req.body.selectedUser, reciever: req.body.currentUser },
        { deliveryStatus: "not delivered" },
      ],
    },'message');

    // console.log(newMsg)
    res.json(newMsg.message);
  } catch (err) {
    res.send("Error: " + err);
  }
};

const storeMessage = async (req, res) => {
    // console.log(req.body);
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
    //   recipient is offline, store message in database
      // const message = new Message({
      //   sender: req.body.currentUser,
      //   receiver: req.body.selectedUser,
      //   message: req.body.message,
      //   deliveryStatus: "not delivered" // set isDelivered flag to false
      // });
      // message.save();
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
