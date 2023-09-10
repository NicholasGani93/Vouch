const express = require("express");
const mongoose = require('mongoose');
const Users = require('./models/users');
const Messages = require('./models/messages');

const PORT = process.env.PORT || 3001;

const app = express();
const http = require('http').Server(app);
const cors = require('cors');
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user just connected!`);
    socket.on('message', (data) => {
      try {
          const message = Messages.create({
            username:data.name,
            roomid:data.roomid,
            message:data.text
          })
      } catch (error) {
          console.log(error.message);
      }
      socketIO.broadcast.to(data.roomid).emit('messageResponse', data.text);
    });
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
});

app.post('/login', async(req, res) => {
  try {
      let query = {
        username:req.body.Username,
        roomid:req.body.RoomID
      }
      let existingUser = false;
      await Users.find(query, function(err, data){
        if(err){
            console.log(err);
            return
        }
        existingUser = data.length == 0;
    })
    if(!existingUser){
      const user = await Users.create(query);
      res.status(200).json(user);
    }else{
      res.status(500).json({message: "Username already used"})
    }
  } catch (error) {
      console.log(error.message);
      res.status(500).json({message: "Server error"})
  }
})
app.post('/logout', async(req, res) => {
  try {
      const result = await Users.remove({
        username:req.body.Username,
        roomid:req.body.RoomID
      }, function (err, result) {
        if (err){
          console.log(err);
        }
      });
      if(!result){
          return res.status(500).json({message: "Server error"});
      }
      res.status(200).json(result);
      
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
  }
})
app.get('/messages', async(req, res) => {
    try {
        const messages = await Messages.find({
          roomid:req.body.RoomID
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb://localhost:27017/chat')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
}).catch((error) => {
    console.log(error)
})

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});