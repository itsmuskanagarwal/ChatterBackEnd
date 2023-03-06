const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Message = require("./model/chat");

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const cors = require("cors");
bodyParser = require("body-parser");

const dotenv = require("dotenv");
const { count } = require("console");
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

let deliveryStatus = "not delivered";
let onlineUsers = [];

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:4200", // Replace with your Angular app's origin
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

app.use(cors());

io.on("connection", async (socket) => {
  
  //Listen for chat count
  // socket.on("chatCount",(data)=>{
  //   console.log(data);

  //   // Message.aggregate([
  //   //   // Filter by the person's email and the message delivery status
  //   //   { $match: { 
  //   //       people: {$all:[data.selectedUser,data.currentUser]}, 
  //   //       'messages.deliveryStatus': 'not delivered' ,
  //   //       'messages.sender': data.selectedUser,
  //   //   }},
  //   //   // Unwind the messages array to get one document per message
  //   //   { $unwind: '$messages' },
  //   //   // Count the number of messages
  //   //   { $count: 'messageCount' }
  //   // ]).exec((err, result) => {
  //   //   if (err) {
  //   //     // Handle the error
  //   //     console.log(err);
  //   //   } else {
  //   //     // Assign the messageCount value to a variable
  //   //     if (result.length > 0) {
  //   //       // Assign the messageCount value to a variable
  //   //       const messageCount = result[0].messageCount;
  //   //       console.log(`The person has ${messageCount} undelivered messages.`);
  //   //       socket.emit("chatCount",messageCount);
  //   //     } else {
  //   //       const messageCount = '';
  //   //       socket.emit("chatCount",messageCount);
  //   //       console.log(`No undelivered messages found for the person.`);
  //   //     }
  //   //   }
  //   // });
    
    
  //   Message.aggregate([
  //     // Filter by the person's email and the message delivery status
  //     { $match: { 
  //         people: { $all: [data.selectedUser, data.currentUser] },
  //         'messages.deliveryStatus': 'not delivered' ,
  //         'messages.sender': data.selectedUser,
  //     }},
  //     // // Unwind the messages array to get one document per message
  //     { $unwind: '$messages' },
  //    // Count the number of messages
  //    { $count: 'messageCount' }
  //   ]).exec((err, result) => {
  //     if (err) {
  //       // Handle the error
  //       console.log(err);
  //     } else {
  //       console.log(result);
  //       // Assign the messageCount value to a variable
  //       if (result.length > 0) {
  //         // Assign the messageCount value to a variable
  //         const messageCount = result[0].messageCount;
  //         console.log(`The person has ${messageCount} undelivered messages.`);
  //         socket.emit("chatCount",messageCount);
  //       } else {
  //         const messageCount = '';
  //         socket.emit("chatCount",messageCount);
  //         console.log(`No undelivered messages found for the person.`);
  //       }
  //     }
  //   });
    

  //   const query= {
  //     $and: [
  //       {people:{
  //         $in:[data]}
  //       },
  //       { messages: { deliveryStatus: "not delivered" } },
  //     ]
  //   };
  //   console.log("query",{query})
  //   Message.find(query)
  // // .select('messages')
  // .exec((err, messages) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     chatCount=messages.length;
  //     console.log(messages);
  //     console.log(`There are ${messages.length} undelivered messages.`);
  //   }
  // });
  // })
  
  
  //Listen for online Users
  socket.on("onlineSockets", (data) => {
    let flag = true;
    if (onlineUsers.length > 0) {
      for (let i = 0; i < onlineUsers.length; i++) {
        console.log("User: " + onlineUsers[i].email, socket.id);
        // console.log(socket.id);
        
        if (onlineUsers[i].sktID == socket.id) {
          console.log("in " + socket.id);
          flag = true;
        } else {
          flag = false;
        }
      }
      if (!flag) {
        onlineUsers.push({ email: data, sktID: socket.id });
        console.log("New client connected");
        console.log(onlineUsers);
      }
    } else {
      console.log("in else");
      onlineUsers.push({ email: data, sktID: socket.id });
      console.log(onlineUsers);
    }
  });

  io.emit("onlineSockets", onlineUsers);

  socket.on("join-room", (data) => {
    // Broadcast the message to particular connected client
    console.log(`Socket ${socket.id} joining room ${data}`);
    console.log(data);
    socket.join(data);
  });

  // Listen for incoming messages from the client
  socket.on("message", (data) => {
    console.log(`Received message: ${data}`);
    console.log(data[0]);

    // Broadcast the message to all connected clients
    io.in(data[0]).emit("message", data);

    if (onlineUsers.length > 0) {
      for (let i = 0; i < onlineUsers.length; i++) {
        if (onlineUsers[i].email == data[1]) {
          deliveryStatus = "delivered";
          break;
        }
      }
    }

    //update the message array of the users in the particular room
    Message.findById(data[0], (err, conversation) => {
      if (err) {
        console.log(err);
      } else {
        conversation.messages.push({
          message: data[3],
          timestamp: Date.now(),
          sender: data[2],
          deliveryStatus: deliveryStatus,
        });
        conversation.save(function (err, conversation) {
          if (err) {
            console.log(err);
          } else {
            console.log("Message added to conversation:", conversation);
          }
        });
      }
    });
  });

  // Listen for disconnections
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    onlineUsers = onlineUsers.filter((id) => id.sktID !== socket.id);
    console.log(onlineUsers);
    io.emit("onlineSockets", onlineUsers);
  });
});

// Mongo DB conncetion
const database = process.env.MONGO_URI;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Database sucessfully connected"))
  .catch((err) => console.log("Database error: " + err));

//routes path
app.use("/", require("./routes/user.routes"));

// PORT
const port = process.env.PORT || 3000;

//Listen to a specific port
server.listen(port, () => {
  console.log("Listening on port " + port);
});
