'use strict';

const Audience = require('./audience');
const { FORBIDDEN } = require('../errors/status');
const jwtVerifier = require('./jwtVerifier');

const extractJwt = req => req.cookies.accessToken;
const ACCESS_FORBIDDEN_MESSAGE = 'Your access to this resource is forbidden';

const authenticate = jwtVerifier(
  extractJwt,
  Audience.Scope.Access,
  FORBIDDEN,
  ACCESS_FORBIDDEN_MESSAGE
);

module.exports = authenticate;
