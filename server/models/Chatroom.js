const mongoose = require('mongoose');

const ChatroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})
module.exports = mongoose.models.Chatroom || mongoose.model('Chatroom', ChatroomSchema);;
