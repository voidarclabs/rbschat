const express = require('express');
const socketio = require('socket.io');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/'));
});

const server = app.listen(3000, () => {
    console.log('Server running!')
});

const io = socketio(server)

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);
    socket.emit('messageconnect', 'connected to websocket server')
    socket.on('message', (data) => {
            console.log(`mesage from ${data.id} (${socket.id}): ${data.message}`)
            socket.emit('message', `msg received: ${data.message}`)
            io.sockets.emit('chatmessage', '<div id="messagecontent"><span id="sender">' + data.id + ':</span> ' + data.message + '</div>')
        })
    });

