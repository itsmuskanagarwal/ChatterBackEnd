const Message = require("../model/chat");
const chats = require("../model/chat")

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

  // console.log("req body ==> "+req.body)
  console.log("req current ==> "+req.body.currentUser)
  console.log("req selected ==> "+req.body.selectedUser)

  try {
   
    
  const data = await chats.findOne({
    people: { $all: [req.body.currentUser, req.body.selectedUser] },
    "messages.sender": req.body.selectedUser,
    "messages.deliveryStatus": "not delivered"
  }, {
    "messages.sender": 1,
    "messages.deliveryStatus": 1
  }).lean()

    console.log(data)

    const undeliveredCount = data?.messages.filter(message => message.sender === req.body.selectedUser && message.deliveryStatus === "not delivered").length ?? 0;
    console.log(`Undelivered messages count: ${undeliveredCount}`);

    res.status(200).json(undeliveredCount );

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const updateStatus = async (req, res) => {

  console.log(req.body.currentUser)
  console.log(req.body.selectedUser)

  try {
    const filter = {
      people: { $all: [req.body.currentUser, req.body.selectedUser] },
      "messages.sender": req.body.selectedUser,
      "messages.deliveryStatus": "not delivered"
    };

    console.log("Filter:", filter);
    
    const update = {
      $set: { "messages.$[].deliveryStatus": "delivered" }
    };

    console.log("Update:", update);

    const options = {
      arrayFilters: [
        { "elem.sender": req.body.selectedUser },
        { "elem.deliveryStatus": "not delivered" }
      ]
    };

    console.log("options: "+ options)
    
    const result = await chats.updateMany(filter, update, options);
    console.log("query result: "+JSON.stringify(result))

    res.status(200).json( "Updated documents.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating documents.' });
  }
};



module.exports = {
  prevMessages,
  chatCount,
  updateStatus
};
