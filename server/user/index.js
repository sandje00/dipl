'use strict';

const authenticate = require('../shared/auth');
const ctrl = require('./user.controller');
const router = require('express').Router();
const verifyJwt = require('../shared/auth/verify');

router
  .post('/register', ctrl.register)
  .post('/login', ctrl.login)
  .post('/forgot-password', ctrl.forgotPassword)
  .get('/verify/:token', verifyJwt, ctrl.verify)
  .post('/reset-password', verifyJwt, ctrl.resetPassword)
  .use(authenticate)
  .post('/logout', ctrl.logout)
  // Test route
  .get('/', ctrl.getAll);

module.exports = { path: '/users', router };
