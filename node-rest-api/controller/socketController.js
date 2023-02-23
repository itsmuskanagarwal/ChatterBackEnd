// const http = require('http');
// const server = http.Server(userRoute);

// const socketIO = require('socket.io')();
// const io = socketIO(server);
const io = require('socket.io')();

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.email);
        socket.broadcast.to(data.email).emit('user joined');
    });
  
    socket.on('message', (data) => {
        io.in(data.email).emit('new message', {email: data.email, message: data.message});
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });

  module.exports = io;