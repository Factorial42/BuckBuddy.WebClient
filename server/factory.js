'use strict'
let envCfg = require('../env');

let Hapi = require('hapi'),
  constants = require('./constants'),
  routes = require('./routes'),
  path = require('path');

module.exports = {

  /**
   * Create a server and return the object immediately.
   *
   * @returns {Hapi.Server}
   */
  create() {

    return _create();

  },

  /**
   * Returns a promise that resolves to a Hapi.Server object
   *
   * @returns {Promise}
   */
  resolve() {
    return _create(true);
  }

};


/**
 * Create the HAPI server object
 *
 * @param returnPromise
 * @returns {*}
 * @private
 */
function _create(returnPromise) {

  var debug = envCfg.environment === "development";

  var serverCfg = {};

  if (debug) {
    serverCfg.debug = {
      request: ['error', 'debug']
    };
  }

  var server = new Hapi.Server(serverCfg);

  if (debug) {
    server.on('log', function (event, tags) {
      if (tags.debug) {
        console.log('DEBUG: ', event);
      }
    });
  }

  server.on('request-error', function (request, error) {
    console.error('request error', error);
  });

  /**
   * Cache jade templates in non-prod environments
   */
  server.views({
    engines: {
      jade: {
        module: require('jade'),
        isCached: envCfg.environment !== "development"
      }
    },
    path: path.join(__dirname, 'views')
  });

  server.connection({port: envCfg.bbAppPort});

  /**
   * Set up auth cookie config
   */
  server.state(constants.tokenCookieName, {
    ttl: null,
    encoding: 'base64',
    strictHeader: true, // don't allow violations of RFC 6265
    domain: envCfg.cookieDomain ? envCfg.cookieDomain : null
  });

  /**
   * If in staging/prod, redirect http requests to https
   */
  // if (envCfg.environment === 'production' ||
  //     envCfg.environment === 'staging') {
  //   server.ext('onRequest', function (request, reply) {
  //     if (request.headers['x-forwarded-proto'] !== 'https') {
  //       return reply.redirect('https://' + request.headers.host + request.path);
  //     }
  //     reply.continue();
  //   });
  // }
  var promise = Promise.resolve(server)
    .then(routes);

  if (returnPromise) return promise;

  return server;

}
