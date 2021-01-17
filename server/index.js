const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIo = require("socket.io");
const hostname = 'localhost';
const port = 9000;

const app = express();
app.use(bodyParser.json());


let rooms = {};
let userInfo = {};
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});
app.use(cors());
app.post('/user', (req, res, next) => {
    if (rooms[req.body.room]) {
        if (rooms[req.body.room].includes(req.body.userName)) {
            return res.status(400).json({ error: "User with this name allready exist in this room" });
        }
    }
    else {
        rooms[req.body.room] = [];
    }
    rooms[req.body.room].push(req.body.userName)
    return res.status(200).json({ message: "User registered successfully" });
})


io.on('connect', socket => {
    socket.on('join', user => {
        socket.join(user.room)
        userInfo[socket.id] = user;
        socket.emit('message', { user: 'admin', message: `welcome to ${user.name} on ${user.room} room` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', message: `${user.name} has joined` });
    })

    socket.on('sendMessage',  msg => {
        const user = userInfo[socket.id];
        io.to(user.room).emit('message', { user: user.name, message: msg });
    })

    socket.on('disconnect', () => {
        const { name, room } = userInfo[socket.id];
        if (room) {
            socket.broadcast.to(room).emit('message', { user: 'admin', message: `${name} has left the room` });
            let index = rooms[room].indexOf(name);
            if (index > -1) {
                rooms[room].splice(index, 1);
            }
            delete userInfo[socket.id];
        }
    })
})
server.listen(port, () => {
    console.log(`server running at http://${hostname}:${port}`);
})
