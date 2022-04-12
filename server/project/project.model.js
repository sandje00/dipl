'use strict';

const { Model } = require('sequelize');

class Project extends Model {
  static fields({ INTEGER, STRING, TEXT, DATE }) {
    return {
      id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      title: {
        type: STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: TEXT
      },
      imgUrl: {
        type: TEXT
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
    }
  }

  static options() {
    return {
      tableName: 'projects',
      underscored: true,
      paranoid: true,
      timestamps: true
    };
  }

  static associate({ User }) {
    this.belongsTo(User, { foreignKey: { name: 'userId', field: 'user_id' } });
  }
}

module.exports = Project;
