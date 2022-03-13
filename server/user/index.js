'use strict';

const ctrl = require('./user.controller');
const router = require('express').Router();

router.get('/', ctrl.getAll);

module.exports = { path: '/users', router };
