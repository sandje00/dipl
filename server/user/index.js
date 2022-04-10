'use strict';

const authenticate = require('../shared/auth');
const ctrl = require('./user.controller');
const router = require('express').Router();
const verifyJwt = require('../shared/auth/verify');

router
  .post('/register', ctrl.register)
  .post('/login', ctrl.login)
  .get('/verify/:token', verifyJwt, ctrl.verify)
  // Test route
  .get('/', authenticate, ctrl.getAll);

module.exports = { path: '/users', router };
