'use strict';

const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
const { auth: { saltRounds } } = require('../config');

class User extends Model {
  static fields({ INTEGER, STRING, DATE }) {
    return {
      id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      username: {
        type: STRING,
        allowNull: false,
        validate: { len: [2, 50] },
        unique: { msg: 'Try again with different username.' }
      },
      email: {
        type: STRING,
        set(email) {
          this.setDataValue('email', email.toLowerCase());
        },
        allowNull: false,
        validate: { isEmail: true },
        unique: { msg: 'Try again with different email.' }
      },
      password: {
        type: STRING,
        allowNull: false
      },
      createdAt: {
        type: DATE,
        allowNull: false
      },
      updatedAt: {
        type: DATE,
        allowNull: false
      },
      deletedAt: {
        type: DATE
      }
    };
  }

  static hooks() {
    return {
      beforeCreate(user) {
        return user._hashPassword();
      }
    };
  }

  static options() {
    return {
      tableName: 'users',
      underscored: true,
      paranoid: true,
      timestamps: true
    };
  }

  async _hashPassword() {
    if (!this.password) return Promise.resolve(false);
    return bcrypt.genSalt(saltRounds)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(pw => { this.password = pw; });
  }
}

module.exports = User;
