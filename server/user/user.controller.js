'use strict';

const {
  BAD_REQUEST,
  CREATED,
  CONFLICT,
  NOT_FOUND,
  OK,
  UNAUTHORIZED
} = require('../shared/errors/status');
const { UniqueConstraintError, Op } = require('sequelize');
const Audience = require('../shared/auth/audience');
const HttpError = require('../shared/errors/httpError');
const User = require('./user.model');

const msg = {
  SUCCESS_REGISTER: 'You have been registered successfully. Check your email to verify your account.',
  SUCCESS_VERIFY: 'Your email account has been verified.',
  SUCCESS_LOGIN: 'You have logged in successfully.',
  USER_NOT_FOUND: 'User not found.',
  ALREADY_VERIFIED: 'This account has already been verified',
  WRONG_CREDENTIALS: 'Username and password are not matching'
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

async function login(req, res) {
  const { usernameOrEmail, password } = req.body;
  const user = await User.findOne({
    where: {
      [Op.or]: {
        username: usernameOrEmail,
        email: usernameOrEmail
      }
    }
  });
  if (!user) throw new HttpError(UNAUTHORIZED, msg.WRONG_CREDENTIALS);
  const result = await user.passwordCompare(password);
  if (!result) throw new HttpError(UNAUTHORIZED, msg.WRONG_CREDENTIALS);
  const token = user.createToken({
    audience: Audience.Scope.Access,
    expiresIn: '5 days'
  });
  res.cookie('access-token', token, { httpOnly: true });
  res.cookie('is-authenticated', true);
  return res.status(OK).json({ message: msg.SUCCESS_LOGIN });
}

async function getAll(req, res) {
  const users = await User.findAll();
  return res.status(OK).json({ users });
}

module.exports = {
  register,
  verify,
  login,
  getAll
};
