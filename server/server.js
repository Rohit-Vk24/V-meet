
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');


const app = express();
app.use(cors());


const server = http.createServer(app);


const io = socketIo(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});


io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
  
   
    socket.on('drawing', (data) => {
      socket.broadcast.emit('drawing', data);
    });
  

    socket.on('sendMessage', (message) => {
     
      io.emit('receiveMessage', message);
    });
  
    
    socket.on('undo', () => {
      socket.broadcast.emit('undo');
    });
  
    
    socket.on('redo', () => {
      socket.broadcast.emit('redo');
    });
  
   
    socket.on('clear', () => {
      socket.broadcast.emit('clear');
    });
  
    
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  app.get("/",(req,res) => {
    res.send("Server is working");
  })
  

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});


