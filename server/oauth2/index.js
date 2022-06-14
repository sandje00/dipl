'use strict';

const { BAD_REQUEST, OK } = require('../shared/errors/status');
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
  const githubAuthUri = githubClient.buildAuthorizeUri();
  return res.status(OK).json({ githubAuthUri });
}

async function accessToken({ query: { code } }, res) {
  const { data } = await githubClient.accessToken(code);
  if (data?.error) {
    throw new HttpError(BAD_REQUEST, data.error_description);
  }
  if (data?.access_token) {
    res.cookie('githubAccessToken', data.access_token, { httpOnly: true });
  }
  return res.status(OK).send();
}
