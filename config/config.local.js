var config = require('./config.global');

config.env = 'local';
config.mongo.db = 'meetup_test';

module.exports = config;