'use strict';

const { OK } = require('../shared/errors/status');
const User = require('./user.model');

async function getAll(req, res) {
  const users = await User.findAll();
  return res.status(OK).json({ users });
}

module.exports = {
  getAll
};
