const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const db = require('./index.js')
mongoose.Promise = global.Promise;
//------------ User Schema ------------//
const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: false
    },
    blocks : { type: Array}
  }, { 
      timestamps: true,
      toJSON: {
        transform(doc, ret) {
          delete ret.password;
          delete ret.__v;
        },
      },
    });


  UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

//let User = mongoose.model('User', UserSchema);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);;

