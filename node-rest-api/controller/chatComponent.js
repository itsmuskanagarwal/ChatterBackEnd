// When a user sends a message, store it in the collection with the delivery status set to "not delivered"
const newChat = new Chat({
    sender: senderUserId,
    receiver: receiverUserId,
    message: messageText
  });
  
  newChat.save((err, savedChat) => {
    if (err) {
      console.log('Error while saving chat message:', err);
      return;
    }
    console.log('Chat message saved successfully:', savedChat);
  });
  

// When a user logs in, query the collection for any messages that were sent to them while they were offline and whose delivery status is "not delivered"

  Chat.find({ receiver: loggedInUserId, deliveryStatus: 'not delivered' })
  .populate('sender')  //replace the sender field in each chat message with the actual User object
  .exec((err, offlineChats) => { // returns the results as an array of Chat objects
    if (err) {
      console.log('Error while retrieving offline chats:', err);
      return;
    }
    console.log('Offline chats retrieved successfully:', offlineChats);
    // Mark the delivery status of the offline chats as "delivered"
    offlineChats.forEach((chat) => { // each chat message, the deliveryStatus is set to 'delivered'
      chat.deliveryStatus = 'delivered';
      chat.save();
    });
    // Send the offline chats to the user
    socket.emit('offlineChats', offlineChats); // emit the offlineChats event with the offlineChats array as the payload.
  });
