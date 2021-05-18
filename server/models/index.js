const mongoose = require('mongoose');
const config = require('../config/database')

//mongoose.connect('mongodb://localhost/chatapp', {useNewUrlParser: true, useUnifiedTopology: true});

const db = config.database


mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
module.exports = db