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
const pick = require('lodash/pick');
const User = require('./user.model');

const msg = {
  SUCCESS_REGISTER: 'You have been registered successfully. Check your email to verify your account.',
  SUCCESS_VERIFY: 'Your email account has been verified.',
  SUCCESS_FORGOT: 'Password reset email has been sent. Check your email to proceed.',
  SUCCESS_RESET: 'Your password has been reset successfully.',
  USER_NOT_FOUND: 'User not found.',
  ALREADY_VERIFIED: 'This account has already been verified',
  WRONG_CREDENTIALS: 'Username and password are not matching',
  LOGOUT: 'You have logged out of your account'
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

async function verify({ user }, res) {
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
  res.cookie('accessToken', token, { httpOnly: true });
  res.cookie('isAuthenticated', true);
  return res.status(OK).json({
    user: pick(user, ['id', 'username', 'imgUrl', 'active'])
  });
}

function logout(req, res) {
  res.cookie('accessToken', null, { httpOnly: true });
  res.cookie('isAuthenticated', false);
  return res.status(OK).json({ message: msg.LOGOUT });
}

async function forgotPassword({ body }, res) {
  const { email } = body;
  try {
    const user = await User.findOne({ where: { email } });
    user.sendResetToken();
  } catch (err) {
    throw new HttpError(NOT_FOUND, msg.USER_NOT_FOUND);
  }
  return res.status(OK).json({
    message: msg.SUCCESS_FORGOT
  });
}

async function resetPassword({ body: { password }, user }, res) {
  user.password = password;
  await user.save();
  return res.status(OK).json({
    message: msg.SUCCESS_RESET
  });
}

async function getAll(req, res) {
  const users = await User.findAll();
  return res.status(OK).json({ users });
}

module.exports = {
  register,
  verify,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getAll
};
