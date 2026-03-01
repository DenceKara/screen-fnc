const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let viewers = 0;
io.on('connection', (socket) => {
    viewers++;
    io.emit('count', viewers);
    socket.on('disconnect', () => {
        viewers--;
        io.emit('count', viewers);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Server radi na portu ' + PORT);
});
