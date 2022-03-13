'use strict';

const { Server } = require('socket.io');
const io = new Server();

exports.errorHandler = (res, err) => {
  let errorObj = { message: 'validation failed', status: 'failed', data: {} };
  if (err.message.includes('validation failed') || err.message.includes('E11000')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errorObj.data[properties.path] = properties.message;
    });
    return res.status(422).json(errorObj);
  }
  res.status(500).json({ status: 'failed', message: 'Internal server error' });
  throw new Error(err);
};

exports.Socket = {
  emit: function (event, data) {
    console.log(event, data);
    io.sockets.emit(event, data);
  },
  on: function (event, callback = Function) {
    console.log(event, callback());
    io.sockets.on(event, callback());
  },
};

io.sockets.on('connection', function (socket) {
  console.log('Socket.io connected');
  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});

exports.io = io;
