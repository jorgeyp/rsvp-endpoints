var mongoose = require("mongoose");

// TODO extract config

var port = 3000;

mongoose.connect('mongodb://localhost:27017/meetup');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Succesfully connected to MongoDB.")
});

module.exports = db;