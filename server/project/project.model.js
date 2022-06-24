'use strict';

const { Model } = require('sequelize');

class Project extends Model {
  static fields({ INTEGER, STRING, TEXT, JSONB, DATE }) {
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
        unique: { msg: 'Project with this title already exists.' }
      },
      description: {
        type: TEXT
      },
      imgUrl: {
        type: TEXT
      },
      repo: {
        type: JSONB,
        defaultValue: {}
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

  static associate({ User, Task, Note }) {
    this.belongsTo(User, { foreignKey: { name: 'userId', field: 'user_id', allowNull: false } });
    this.hasMany(Task, { foreignKey: { name: 'projectId', field: 'project_id' } });
    this.hasMany(Note, { foreignKey: { name: 'projectId', field: 'project_id' } });
  }
}

module.exports = Project;
