// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Initialize Express
const app = express();
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: '*', // Adjust this in production
    methods: ['GET', 'POST'],
  },
});

// Listen for client connections
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
  
    // Listen for drawing events
    socket.on('drawing', (data) => {
      socket.broadcast.emit('drawing', data);
    });
  
    // Chat message handler
    socket.on('sendMessage', (message) => {
      // Broadcast the message to all other clients
      io.emit('receiveMessage', message);
    });
  
    // Listen for undo events
    socket.on('undo', () => {
      socket.broadcast.emit('undo');
    });
  
    // Listen for redo events
    socket.on('redo', () => {
      socket.broadcast.emit('redo');
    });
  
    // Listen for clear events
    socket.on('clear', () => {
      socket.broadcast.emit('clear');
    });
  
    // Disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
  
// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});


