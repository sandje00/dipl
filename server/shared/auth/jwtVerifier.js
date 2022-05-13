'use strict';

const { auth: { secret } } = require('../../config');
const HttpError = require('../errors/httpError');
const jwt = require('jsonwebtoken');
const { NOT_FOUND } = require('../errors/status');
const { User } = require('../database');

function jwtVerifier(extractJwt, jwtAudience, errorCode, errorMessage) {
  const msg = {
    TOKEN_INVALID: 'Token is invalid.',
    TOKEN_EXPIRED: 'Token is expired.',
    USER_NOT_FOUND: 'User not found.'
  };

  return async (req, _, next) => {
    const token = extractJwt(req);
    if (!token) {
      throw new HttpError(errorCode, errorMessage || msg.TOKEN_INVALID);
    }
    try {
      const { id, aud } = jwt.verify(token, secret);
      if (aud !== jwtAudience) {
        throw new HttpError(errorCode, msg.TOKEN_INVALID);
      }
      const user = await User.findByPk(id);
      if (!user) {
        throw new HttpError(NOT_FOUND, msg.USER_NOT_FOUND);
      }
      req.user = user;
      return next();
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        throw new HttpError(errorCode, msg.TOKEN_INVALID);
      }
      if (err instanceof jwt.TokenExpiredError) {
        throw new HttpError(errorCode, msg.TOKEN_EXPIRED);
      }
      throw err;
    }
  };
}

module.exports = jwtVerifier;
