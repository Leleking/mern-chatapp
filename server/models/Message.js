const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
   /*  chatroom: {
        type: String,
        required: false
    }, */
    sender_id: {
        type: String,
        required: true
    },
    sender_name: {
        type: String,
        required: true
    },
    receiver_id: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true 
    }, 
},
{ 
    timestamps: true
}
)
module.exports = mongoose.models.Message || mongoose.model('Message', MessageSchema);;
