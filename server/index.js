const express = require('express');

const MessageDB =  require('./models/Message')

require('dotenv').config()
var bodyParser = require('body-parser')
const db = require('./models/index')
const cors =require('./config/cors')
const http = require('http');
const socketio = require('socket.io');
var config = require('./configuration.json')

const PORT = config.PORT || 5000

const app = express();
const server = http.createServer(app);
const { addUser, removeUser, getUser, getUsersInRoom, getAllUsers} = require('./app/controllers/Chat/ChatController')

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cors())
app.options('*', cors());
app.use(bodyParser.json())
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
    console.log("We have a new connection.");
    socket.on('join', ({ _id, name, email, room, blocks}, callback) => {
        //console.log(socket)
        const {user, error} = addUser({_id, name, email, room, socket_id: socket.id, blocks})
        console.log(user)
        
        //var users = getUsersInRoom(blocks)
       
        //socket.emit('message')
        var users = getAllUsers()
        var users_in_room = []
        users.forEach(activeUser => {
            users_in_room = getUsersInRoom(activeUser._id)
            io.to(activeUser.socket_id).emit('joined', {user, text: `${user.name} has joined`, type: 'join', users: users_in_room})

        })
        /* var users = getAllUsers()
        console.log("joing as ")
        io.emit('joined', {user, text: `${user.name} has joined`, type: 'join', users}) */
        socket.join(user.room)
        //callback();

    })

    socket.on('sendMessage', (message, callback) => {
        console.log(message)
        //const user = getUser(message.sender.id)
        const receiver_socket_id = message.receiver_socket_id;
        //const messageData = message.data;
        const {sender_id, receiver_id, sender_name } = message
        var _message = message.message
        var newMessage = new MessageDB({sender_id, receiver_id, message: _message, sender_name})
        newMessage.save(function(err) {
            if(err) {
                console.log("message saved successfully")
                //return res.json({success: false, msg: "Email already exists"})
            } else {
                console.log(err)
            }
        })
        io.to(receiver_socket_id).emit('message', {message})
        //socket.broadcast.to(receiver_socket_id).emit('message', message);

    })
    socket.on('disconnect', () => {
        console.log('User just left');
    })
})
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));