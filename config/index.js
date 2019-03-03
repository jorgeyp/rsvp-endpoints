var env = process.env.NODE_ENV || 'local'
  , config = require('./config.'+env);

module.exports = config;