'use strict';

const { Model } = require('sequelize');

class Note extends Model {
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
        unique: { msg: 'A note with this title already exists.' }
      },
      description: {
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
      tableName: 'notes',
      underscored: true,
      paranoid: true,
      timestamps: true
    };
  }

  static associate({ User, Project }) {
    this.belongsTo(User, { foreignKey: { name: 'userId', field: 'user_id', allowNull: false } });
    this.belongsTo(Project, { foreignKey: { name: 'projectId', field: 'project_id' } });
  }
}

module.exports = Note;
