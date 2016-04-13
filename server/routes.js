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
        fbAppId: envCfg.bbFbAppId,
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


  server.route([
  {
    method: 'POST',
    path: '/api/{param*}',
    handler: {
      proxy: {
        passThrough: true,
        mapUri: function (request, next) {
          let path = request.url.path.replace("/api", "");
          let apiUri = envCfg.bbApiEndpoint + path;
          next(null, apiUri);
        }
            // ,
            // onResponse: function (err, res, request, reply, settings, ttl) {
            //
            //     console.log('receiving the response from the upstream.');
            //     Wreck.read(res, { json: true }, function (err, payload) {
            //
            //         console.log('some payload manipulation if you want to.')
            //         reply(payload).headers = res.headers;
            //     });
            // }
      }
    }
  }
]);


  /**
   * END Routes
   ****************************/

  return server;

}
