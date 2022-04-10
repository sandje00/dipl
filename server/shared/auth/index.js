'use strict';

const Audience = require('./audience');
const { auth: { secret } } = require('../../config');
const { FORBIDDEN } = require('../errors/status');
const HttpError = require('../errors/httpError');
const jwt = require('jsonwebtoken');
const { User } = require('../database');

const msg = {
  ACCESS_FORBIDDEN: 'Your access to this resource is forbidden',
  TOKEN_INVALID: 'Token is invalid',
  TOKEN_EXPIRED: 'Token is expired'
};

async function authenticate(req, _, next) {
  const token = req.cookies.accessToken;
  if (!token) throw new HttpError(FORBIDDEN, msg.ACCESS_FORBIDDEN);
  try {
    const { id, aud } = jwt.verify(token, secret);
    if (aud !== Audience.Scope.Access) {
      throw new HttpError(FORBIDDEN, msg.TOKEN_INVALID);
    }
    const user = await User.findByPk(id);
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new HttpError(FORBIDDEN, msg.TOKEN_INVALID);
    }
    if (err instanceof jwt.TokenExpiredError) {
      throw new HttpError(FORBIDDEN, msg.TOKEN_EXPIRED);
    }
    throw err;
  }
}

module.exports = authenticate;
