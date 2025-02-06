const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('draw', (data) => io.emit('draw', data));
    socket.on('clearCanvas', () => io.emit('clearCanvas'));
    socket.on('disconnect', () => console.log('User disconnected'));
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
