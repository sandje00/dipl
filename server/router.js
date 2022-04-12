'use strict';

const router = require('express').Router();
const user = require('./user');
const project = require('./project');

router.use(user.path, user.router);
router.use(project.path, project.router);

module.exports = router;
