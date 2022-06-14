'use strict';

const { BAD_REQUEST, FORBIDDEN, OK } = require('../shared/errors/status');
const authenticate = require('../shared/auth');
const githubClient = require('./githubClient');
const HttpError = require('../shared/errors/httpError');
const router = require('express').Router();

router
  .use(authenticate)
  .get('/authorize', authorize)
  .post('/access-token', accessToken);

module.exports = { path: '/oauth2', router };

async function authorize(req, res) {
  const { state, githubAuthUri } = githubClient.buildAuthorizeUri('repo');
  res.cookie('githubCsrfState', state, { httpOnly: true });
  return res.status(OK).json({ githubAuthUri });
}

async function accessToken({
  query: { code, state },
  cookies: { githubCsrfState }
}, res) {
  if (state !== githubCsrfState) {
    throw new HttpError(FORBIDDEN, 'Your access to this resource is forbidden');
  }
  const { data } = await githubClient.accessToken(code);
  if (data?.error) {
    throw new HttpError(BAD_REQUEST, data.error_description);
  }
  if (data?.access_token) {
    res.cookie('githubAccessToken', data.access_token, { httpOnly: true });
  }
  res.clearCookie('githubCsrfState');
  return res.status(OK).send();
}
