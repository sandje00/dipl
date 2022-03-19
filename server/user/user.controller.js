'use strict';

const { CREATED, BAD_REQUEST, OK } = require('../shared/errors/status');
const HttpError = require('../shared/errors/httpError');
const { UniqueConstraintError } = require('sequelize');
const User = require('./user.model');

const msg = {
  SUCCESS_REGISTER: 'You have been registered successfully. Check your email to verify your account.'
};

async function register({ body }, res) {
  try {
    await User.create(body);
    // TODO: verify user email
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      throw new HttpError(BAD_REQUEST, err.errors[0].message);
    }
    throw err;
  }
  return res.status(CREATED).json({ message: msg.SUCCESS_REGISTER });
}

async function getAll(req, res) {
  const users = await User.findAll();
  return res.status(OK).json({ users });
}

module.exports = {
  register,
  getAll
};
