'use strict';

const { Model } = require('sequelize');
const priority = require('../../common/priority');
const status = require('../../common/status');
const type = require('../../common/type');
const values = require('lodash/values');

class Task extends Model {
  static fields({ INTEGER, STRING, TEXT, ENUM, DATE }) {
    return {
      id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      title: {
        type: STRING,
        allowNull: false
      },
      description: {
        type: TEXT
      },
      type: {
        type: ENUM(values(type)),
        defaultValue: type.TASK
      },
      priority: {
        type: ENUM(values(priority)),
        defaultValue: priority.MEDIUM
      },
      status: {
        type: ENUM(values(status)),
        defaultValue: status.TO_DO
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
      tableName: 'tasks',
      underscored: true,
      paranoid: true,
      timestamps: true
    };
  }

  static associate({ User, Project, Task }) {
    this.belongsTo(User, { foreignKey: { name: 'userId', field: 'user_id', allowNull: false } });
    this.belongsTo(Project, { as: 'project', foreignKey: { name: 'projectId', field: 'project_id' } });
    this.belongsTo(Task, { as: 'parent', foreignKey: { name: 'parentTaskId', field: 'parent_task_id' } });
    this.hasMany(Task, { as: 'children', foreignKey: { name: 'parentTaskId', field: 'parent_task_id' } });
  }
}

module.exports = Task;
