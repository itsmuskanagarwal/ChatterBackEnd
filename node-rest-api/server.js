const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Message = require("./model/chat");

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const cors = require("cors");
bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

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

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join-room", (data) => {
    // Broadcast the message to particular connected client
    socket.join(data);
  });

  // Listen for incoming messages from the client
  socket.on("message", (data) => {
    console.log(`Received message: ${data}`);

    // Broadcast the message to all connected clients
    // io.emit('message', (data));

    //update the message array of the users in the particular room
    Message.findById(data[0], (err, conversation) => {
      if (err) {
        console.log(err);
      } else {
        conversation.messages.push({
          message: data[3],
          timestamp: Date.now(),
          sender: data[2],
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
