'use strict';

const Audience = require('../shared/auth/audience');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { logger } = require('../shared/logger');
const { Model } = require('sequelize');
const pick = require('lodash/pick');
const { sendVerificationEmail } = require('../shared/mail');
const { auth: { saltRounds, secret } } = require('../config');

class User extends Model {
  static fields({ INTEGER, STRING, TEXT, BOOLEAN, DATE }) {
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
      imgUrl: {
        type: TEXT
      },
      active: {
        type: BOOLEAN,
        defaultValue: false
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

  static associate({ Project }) {
    this.hasMany(Project, { foreignKey: { name: 'userId', field: 'user_id' } });
  }

  async _hashPassword() {
    if (!this.password) return Promise.resolve(false);
    return bcrypt.genSalt(saltRounds)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(pw => { this.password = pw; });
  }

  async passwordCompare(password) {
    return bcrypt.compare(password, this.password);
  }

  createToken(options = {}) {
    const payload = pick(this, ['id', 'username', 'email']);
    return jwt.sign(payload, secret, options);
  }

  async verifyEmail() {
    const token = this.createToken({
      audience: Audience.Scope.Setup,
      expiresIn: '5 days'
    });

    return sendVerificationEmail(token, this.email)
      .catch(err => {
        logger.error('An error has occured sending verification email:', err.message);
      });
  }
}

module.exports = User;
