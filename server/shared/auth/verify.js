'use strict';

const Audience = require('./audience');
const { BAD_REQUEST } = require('../errors/status');
const jwtVerifier = require('./jwtVerifier');

const extractJwt = req => req.params.token || req.body.token;

const verify = jwtVerifier(
  extractJwt,
  Audience.Scope.Setup,
  BAD_REQUEST
);

module.exports = verify;
