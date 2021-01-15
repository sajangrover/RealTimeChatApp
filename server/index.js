const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIo = require("socket.io");
const hostname = 'localhost';
const port = 9000;

const app = express();
app.use(bodyParser.json());


let user = {};
const server = http.createServer(app);
const io  = socketIo(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
});
app.use(cors());
app.post('/user', (req,res,next) => {
    if(user[req.body.userName] == req.body.room) {
        res.status(400).json({error: "User with this name allready exist in this room"});
    }
    user[req.body.userName] = req.body.room;
    res.status(200).json({message: "User registered successfully"});
})


io.on('connect', socket => {
     socket.on('join', (user, callback) => {
        callback(`Welcome ${user.name} on ${user.room} room`);
     })
     socket.emit('message', "hello world");
     socket.on('sendMessage',(msg) => {
         console.log(msg)
     })
})
server.listen(port,()=>{
    console.log(`server running at http://${hostname}:${port}`);
})
