const express = require('express');
const router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);

const {blockUser, getPrivateChatMessages, unblockUser, loginUser} = require('../app/controllers/Chat/ChatController')


router.get('/', (req, res) => {
    res.send('server is up and running');
});

router.post('/chat/getUser', loginUser)
router.post('/chat/block', blockUser)
router.post('/chat/unblock', unblockUser)
router.post('/chat/messages',getPrivateChatMessages)
module.exports = router