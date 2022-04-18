'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('notes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        field: 'user_id',
        allowNull: false
      },
      projectId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projects',
          key: 'id'
        },
        field: 'project_id'
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: 'deleted_at'
      }
    });
  },

  async down (queryInterface) {
    return queryInterface.dropTable('notes');
  }
};
