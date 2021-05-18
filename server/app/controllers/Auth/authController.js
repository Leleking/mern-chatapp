let config = require('../../../config/database'),
    jwt = require('jsonwebtoken');
//var jwt = require('jsonwebtoken');
const {body, validationResult } = require('express-validator')
let User = require('../../../models/User')

exports.validate = (method) => {
    switch (method) {
        case 'registerHandler': {
         return [ 
            body('name').exists(),
            body('password').exists(),
            body('email').exists().isEmail(),
           ]   
        }
        case 'signInHandler': {
            return [ 
               body('password').exists(),
               body('email').exists().isEmail(),
              ]   
        }
    }
}

exports.registerHandler = (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    
    const { name, email, password} = req.body
    var newUser = new User({name, email, password})
    newUser.save(function(err) {
        if(err) {
            return res.json({success: false, msg: "Email already exists"})
        }
        return res.json({success: true, msg: 'Successfully created new user'})
    })
    //return res.json({success: true, msg: 'register handle is working fine'})

}

exports.signInHandler = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password} = req.body
    User.findOne({
       email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    let token = jwt.sign(user.toJSON(), config.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token, user });
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });

   
}