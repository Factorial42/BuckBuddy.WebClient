var Joi = require('joi'),
  _ = require('underscore'),
  path = require('path'),
  envCfg = require('../env'),
  apiController = require('./controllers/api');

module.exports = function(server) {

  return _applyRoutes(server);

};

var commonLocals = {
  environment: envCfg.environment
};


function _applyRoutes(server) {

  /****************************
   * BEGIN Routes
   */

  /**
   * The general app route
   */
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: function (request, reply) {

      reply.view('main', _.extend(commonLocals, {
        user: {}, //TODO: remove this?
        stripeKey: envCfg.stripePublicKey,
        packageVersion: require('../package.json').version
      }));

    }
  });

  server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: path.normalize(__dirname + '/../public')
      }
    }
  });

  /**
   * Login action route
   */
  server.route({
    method: "POST",
    path: "/login",
    handler: apiController.login,
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().required()
        }
      }
    }
  });

  /**
   * Logout route
   */
  server.route({
    method: "POST",
    path: "/logout",
    handler: apiController.logout,
    config: {}
  });

  /**
   * END Routes
   ****************************/

  return server;

}
