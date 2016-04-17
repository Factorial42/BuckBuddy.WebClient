'use strict'

var envok = require('envok');
var Joi = require('joi');

const config = envok({
  NODE_ENV: Joi.string().required().allow('development', 'staging', 'production'),
  BB_APP_PORT: Joi.number().required().min(3000).max(9000),
  BB_API_ENDPOINT: Joi.string().uri({scheme: ['http']}).required(),
  BB_API_KEY: Joi.string().required(),
  BB_COOKIE_DOMAIN: Joi.string().empty(""),
  BB_STRIPE_PUBLIC_KEY: Joi.string().token().required(),
  BB_STRIPE_REDIRECT_URL: Joi.string().required(),
  BB_STRIPE_CLIENT_ID: Joi.string().token().required(),
  BB_FB_APP_ID: Joi.string().token().required()
})

console.log(config);

module.exports = config;
