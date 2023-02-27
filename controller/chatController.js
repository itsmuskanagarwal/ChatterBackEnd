const Message = require("../model/chat");

// get all messages sent and received between sender and reciever
const prevMessages = async (req, res) => { 

  //find previous messages between the two users
  try {
    console.log("hey : ", req.body);
    const previousMsg = await Message.find(
      {
        people: { $all: [req.body.currentUser, req.body.selectedUser] },
      },
      { messages: 1 }
    );
    if (previousMsg.length > 0) {

      //If any previous messages are found
      console.log("in if");      
      res.json(previousMsg); //returns them as a JSON response to the client

    } 
    else //creates a new Message document 
    {
      console.log("in else");
      const message = new Message({
        people: [req.body.currentUser, req.body.selectedUser],
        messages: [],
      }); // an empty messages array

      const result = await message.save(); //saves it to the database 
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
