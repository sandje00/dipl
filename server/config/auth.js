'use strict';

const {
  AUTH_SALT_ROUNDS,
  AUTH_JWT_SECRET
} = process.env.AUTH_SALT_ROUNDS;

module.exports = {
  saltRounds: parseInt(AUTH_SALT_ROUNDS),
  secret: AUTH_JWT_SECRET
};
