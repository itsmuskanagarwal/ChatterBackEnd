const Message = require("../model/chat");

// get all messages sent and received between sender and reciever
const prevMessages = async (req, res) => {
  try {
    console.log("hey : ", req.body);
    const previousMsg = await Message.find(
      {
        people: { $all: [req.body.currentUser, req.body.selectedUser] },
      },
      { messages: 1 }
    );
    if (previousMsg.length > 0) {
      console.log("in if");
      // console.log(previousMsg);
      res.json(previousMsg);
    } else {
      console.log("in else");
      const message = new Message({
        people: [req.body.currentUser, req.body.selectedUser],
        messages: [],
      });
      const result = await message.save();
      res.json(result);
    }
    console.log("previousMsg:", previousMsg);
  } catch (err) {
    console.log(err);
    res.send("Error: " + err);
  }
};

module.exports = {
  prevMessages
};
