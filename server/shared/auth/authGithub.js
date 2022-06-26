'use strict';

const { FORBIDDEN } = require('../errors/status');
const HttpError = require('../errors/httpError');

function authGithub(req, _, next) {
  // TODO: Find a way how to validate access token
  const { githubAccessToken } = req.cookies;
  if (!githubAccessToken) {
    throw new HttpError(FORBIDDEN, 'In order to proceed you must authorize GitHub.');
  }
  req.githubAccessToken = githubAccessToken;
  return next();
}

module.exports = authGithub;
