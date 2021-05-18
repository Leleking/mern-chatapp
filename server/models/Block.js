const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    blocked_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    
    
},
{ 
    timestamps: true
}
)
module.exports = mongoose.models.Block || mongoose.model('Block', BlockSchema);;
