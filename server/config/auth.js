'use strict';

const { AUTH_SALT_ROUNDS } = process.env.AUTH_SALT_ROUNDS;

module.exports = {
  saltRounds: parseInt(AUTH_SALT_ROUNDS)
};
