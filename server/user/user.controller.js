'use strict';

const {
  BAD_REQUEST,
  CREATED,
  CONFLICT,
  NOT_FOUND,
  OK
} = require('../shared/errors/status');
const HttpError = require('../shared/errors/httpError');
const { UniqueConstraintError } = require('sequelize');
const User = require('./user.model');

const msg = {
  SUCCESS_REGISTER: 'You have been registered successfully. Check your email to verify your account.',
  SUCCESS_VERIFY: 'Your email account has been verified.',
  USER_NOT_FOUND: 'User not found.',
  ALREADY_VERIFIED: 'This account has already been verified'
};

async function register({ body }, res) {
  try {
    const user = await User.create(body);
    user.verifyEmail();
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      throw new HttpError(BAD_REQUEST, err.errors[0].message);
    }
    throw err;
  }
  return res.status(CREATED).json({ message: msg.SUCCESS_REGISTER });
}

async function verify({ id }, res) {
  const user = await User.findByPk(id);
  if (!user) throw new HttpError(NOT_FOUND, msg.USER_NOT_FOUND);
  if (user.active) throw new HttpError(CONFLICT, msg.ALREADY_VERIFIED);
  user.active = true;
  await user.save();
  return res.status(OK).json({
    message: msg.SUCCESS_VERIFY
  });
}

async function getAll(req, res) {
  const users = await User.findAll();
  return res.status(OK).json({ users });
}

module.exports = {
  register,
  verify,
  getAll
};
