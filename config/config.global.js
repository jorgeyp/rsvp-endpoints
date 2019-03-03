var config = module.exports = {};

config.env = 'local';
config.port = process.env.PORT || 3000;

// MongoDB database
config.mongo = {};
config.mongo.uri = process.env.MONGO_URI || "mongodb://localhost:27017/";
config.mongo.db = 'meetup';
