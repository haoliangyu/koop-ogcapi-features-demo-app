const serverless = require("serverless-http");
const koop = require('./koop-server');

// wrap the Koop server with the serverless framework
module.exports.handler = serverless(koop.server);
