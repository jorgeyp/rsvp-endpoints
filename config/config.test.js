var config = require('./config.global');

config.env = 'test';
config.mongo.db = 'meetup_test';

module.exports = config;