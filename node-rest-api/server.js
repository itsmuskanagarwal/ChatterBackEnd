const express = require("express");
const http = require("http");
const socketio = require("socket.io");

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
    origin: 'http://localhost:4200', // Replace with your Angular app's origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for incoming messages from the client
  socket.on('message', (data) => {
    console.log(`Received message: ${data}`);

    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Listen for disconnections
  socket.on('disconnect', () => {
    console.log('Client disconnected');
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

server.listen(port, () => {
  console.log("Listening on port " + port);
});

