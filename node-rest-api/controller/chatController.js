const Message = require('../model/chat');
const io = require('socket.io')();

// get all messages sent and received between sender and reciever
const previousMessages = Message.find({ $and :[ { $or: [{ sender: currentUser, receiver: selectedUser }, { sender: selectedUser, reciever: currentUser }] }, {deliveryStatus : "delivered"}]})
  .exec((err, messages) => {
    if (err) {
      console.log(err)
    } else {
      console.log("Found all"+messages)
    }
  });


  const newMessages =  Message.find({ $and :[ { sender: selectedUser, reciever: currentUser } , {deliveryStatus : "not delivered"}]})
  .exec((err, messages) => {
    if (err) {
      console.log(err)
    } else {
      console.log("Found all"+messages)
    }
  });

  // establish Socket.IO connection
io.on('connection', (socket) => {
  console.log('a user connected');

  // listen for messages from the sender
  socket.on('message', (data) => {
    console.log('received message:', data);

    // check if recipient is online
    if (io.sockets.connected[data.recipientId]) {
      // recipient is online, send message in real-time
      io.to(data.recipientId).emit('message', data.message);

      // store message in database
      const message = new Message({
        sender: data.sender,
        receiver: data.recipient,
        message: data.message,
        deliveryStatus : "delivered"
      });
      message.save();
    } else {
      // recipient is offline, store message in database
      const message = new Message({
        from: data.senderId,
        to: data.recipientId,
        message: data.message,
        deliveryStatus : "not delivered" // set isDelivered flag to false
      });
      message.save();
    }
  });

  // handle disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// start Socket.IO server
io.listen(3000);