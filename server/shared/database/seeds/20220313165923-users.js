'use strict';

const bcrypt = require('bcrypt');
const { auth: { saltRounds } } = require('../../../config');

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('users', [{
      username: 'JohnDoe',
      email: 'johndoe@example.org',
      password: bcrypt.hashSync('mypass', saltRounds),
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
