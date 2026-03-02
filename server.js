const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

let viewers = 0;
io.on('connection', (socket) => {
    viewers++;
    io.emit('count', viewers);

    socket.on('screen-data', (data) => {
        socket.broadcast.emit('show-screen', data);
    });

    socket.on('disconnect', () => {
        viewers--;
        io.emit('count', viewers);
    });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log('Server radi na portu ' + PORT);
});
