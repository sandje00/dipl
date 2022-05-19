'use strict';

const auth = require('./auth');
const db = require('./db');
const githubOAuth = require('./githubOAuth');
const mail = require('./mail');

const port = process.env.PORT || 3000;

module.exports = {
  port,
  db,
  auth,
  mail,
  githubOAuth
};
