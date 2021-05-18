const User = require('../../../models/User');
const Message =  require('../../../models/Message')
const users = []

const loginUser = async (req, res) => {
    const { name, email} = req.body
    User.findOne({
        email
     }, function(err, user) {
         if (err) throw err;
 
         if (!user) {
            var newUser = new User({name, email})
            newUser.save(function(err) {
                if(err) {
                    console.log(err)
                    //return res.json({success: false, user: "Email already exists"})
                }
                return res.json({success: true, user: {_id: newUser._id, name, email, blocks: []}})
            })
         } else {
            return res.json({success: true, user });
             
             
         }
     });
}

const addUser = ({_id, name, room, email, socket_id, blocks}) => {
    var user;
    name = name.trim().toLowerCase();
    email = email.trim().toLowerCase();
    
    var user_index = users.findIndex((user) => user.email === email);
    console.log(user_index)
    if(user_index > -1) {
        users[user_index] = {_id, name, room, email, socket_id, blocks}
        return { user: users[user_index]}
    }

    user = { _id, name, email, room, socket_id, blocks};
    users.push(user)
    return { user }

}

const removeUser = (_id) => {
    const index = users.findIndex((user) => user._id === _id);
    if(index != -1) {
        return users.splice(index,1)[0]
    }
}

const getUser = (_id) => {
    return users.find((user) => users._id === _id)
    
}

const blockUser = async (req, res) => {
    //console.log(req.user)

    //var blocked = new Block({blocked_user_id: req.body.id, user: req.user._id})
    //Block.populate('user')
    //var user_id = req.user._id
    const { blocked_by , blocked_id} = req.body
    console.log(req.body)
    try {
        var active_user = await User.findByIdAndUpdate(blocked_by, { $addToSet: { blocks: [blocked_id]}}, {new: true})
        
        return res.json({msg: 'user blocked', user:active_user})
    } catch (error) {
        return res.json({msg: 'err', error})
        
    }
   
}

const unblockUser = async (req, res) => {
    const { blocked_by , blocked_id} = req.body
   /// console.log(req.body)
    try {
        var active_user = await User.findByIdAndUpdate(blocked_by, { $pullAll: { blocks: [blocked_id]}})
        return res.json({msg: 'user blocked', user:active_user})
    } catch (error) {
        return res.json({msg: 'err', error})
    }
   
}

const getUsersInRoom = (user_id) => {
    console.log(users)
    var allowed_users = users.filter((user) => {
        var users_blocks = user.blocks
        if(!users_blocks.includes(user_id)) {
            return user
        }
    })
    return allowed_users
}

const getAllUsers = () => {
    return users;
}


const getPrivateChatMessages = async (req, res) => {
    //console.log(req.user._id)

    
    //var user_id = req.user._id
    const { sender_id, receiver_id } = req.body
   
    try {
        const messages = await Message.find({
            $or: [
                {
                    sender_id, receiver_id
                },
                {
                    sender_id: receiver_id,
                    receiver_id: sender_id
                }
            ]
        });
        //var active_user = await Message.findByIdAndUpdate(user_id, { $addToSet: { blocks: [req.body.id]}}, {new: true})
        
        return res.json({messages})
    } catch (error) {
        return res.json({msg: 'err', error})
    }
   
}
module.exports = { addUser, removeUser, getUser, getUsersInRoom, blockUser, getAllUsers, getPrivateChatMessages, unblockUser, loginUser}