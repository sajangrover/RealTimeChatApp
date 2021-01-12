const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hostname = 'localhost';
const port = 9000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

let user = {};
app.post('/user', (req,res,next) => {
    if(user[req.body.userName] == req.body.room) {
        res.status(400).json({error: "User with this name allready exist in this room"});
    }
    user[req.body.userName] = req.body.room;
    res.status(200).json({message: "User registered successfully"});
})

app.listen(port,()=>{
    console.log(`server running at http://${hostname}:${port}`);
})
