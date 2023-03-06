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

const chatCount = async (req, res) => {
  await Message.aggregate([
    // Filter by the person's email and the message delivery status
    { $match: { 
        people: { $all: [req.body.selectedUser, req.body.currentUser] },
        'messages.deliveryStatus': 'not delivered' ,
        'messages.sender': req.body.selectedUser,
    }},
    // // Unwind the messages array to get one document per message
    { $unwind: '$messages' },
   // Count the number of messages
   { $count: 'messageCount' }
  ]).exec((err, result) => {
    if (err) {
      // Handle the error
      console.log(err);
    } else {
      console.log(result);
      // Assign the messageCount value to a variable
      if (result.length > 0) {
        // Assign the messageCount value to a variable
        const messageCount = result[0].messageCount;
        console.log(`The person has ${messageCount} undelivered messages.`);
        res.json(messageCount);
      } else {
        const messageCount = '';
        res.json(messageCount);
        console.log(`No undelivered messages found for the person.`);
      }
    }
  });
}

module.exports = {
  prevMessages,
  chatCount
};
