const express = require('express');
const router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);



const AuthController = require('../app/controllers/Auth/authController')


router.get('/user',  passport.authenticate('jwt', { session: false}), (req, res) => {
    console.log(req.user)
    return res.json({status: 200})
})
router.post('/register', AuthController.validate("registerHandler"), AuthController.registerHandler)
router.post('/signin', AuthController.validate("signInHandler"), AuthController.signInHandler)
module.exports = router