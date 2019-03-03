var mongoose = require("mongoose");
var config  = require("./config");

// TODO extract config

mongoose.connect(config.mongo.uri + config.mongo.db);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Succesfully connected to MongoDB.")
});

module.exports = db;