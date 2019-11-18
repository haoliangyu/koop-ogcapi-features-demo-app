const Koop = require('koop')
const cors = require("cors");
const routes = require('./routes')
const plugins = require('./plugins')

// initiate a koop app
const koop = new Koop()

// register koop plugins
plugins.forEach((plugin) => {
  koop.register(plugin.instance, plugin.options)
})

// add additional routes
routes.forEach((route) => koop.server[route.method.toLowerCase()](route.path, route.controller))

// enable CORS
koop.server.use(cors());

module.exports = koop;
