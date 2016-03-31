var _ = require('underscore');

var envCfg = require('../../env'),
  constants = require('../constants'),
  util = require('util'),
  Boom = require('boom');

var ApiController = {

  login(request, reply) {

    reply('OK');

  },

  logout: function (request, reply) {

    reply({}).unstate(constants.tokenCookieName);

  }
};


module.exports = ApiController;
