var config = require('./config.global');

config.env = 'local';
config.mongo.db = 'meetup';

module.exports = config;