'use strict'

let Joi = require('joi'),
  _ = require('underscore'),
  path = require('path'),
  envCfg = require('../env'),
  apiController = require('./controllers/api');

module.exports = function(server) {

  return _applyRoutes(server);

};

let commonLocals = {
  environment: envCfg.environment
};


function _applyRoutes(server) {

  /****************************
   * BEGIN Routes
   */

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


  let resources = ['user', 'campaign'];

  resources.forEach(key => {

    let capitalizedKey = key[0].toUpperCase() + key.slice(1)
    let basePath = `/api-${key}`;
    let endpoint = envCfg[`bb${capitalizedKey}ApiEndpoint`];

    console.log(`Setting ${endpoint} for API with base path ${basePath}`)
    server.route(
    {
      method: ['GET', 'POST', 'PUT', 'DELETE'],
      path: `${basePath}/{param*}`,
      handler: {
        proxy: {
          passThrough: true,
          mapUri: function (request, next) {
            let path = request.url.path.replace(basePath, "");
            let apiUri = endpoint + path;
            console.log(`Handing API request for ${key} - API URL - ${apiUri}`)
            next(null, apiUri);
          }
        }
      }
    })

  })



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
      stripeClientId: envCfg.bbStripeClientId,
      stripeRedirectUrl: envCfg.bbStripeRedirectUrl,
      fbAppId: envCfg.bbFbAppId,
      packageVersion: require('../package.json').version
    }));

  }
});


  /**
   * END Routes
   ****************************/

  return server;

}
