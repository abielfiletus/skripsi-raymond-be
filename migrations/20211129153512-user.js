'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: Sequelize.DataTypes.STRING(20),
        required: true,
      },
      last_name: {
        type: Sequelize.DataTypes.STRING(20),
        required: true,
      },
      gender: {
        type: Sequelize.DataTypes.CHAR(1),
        required: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING(50),
        required: true,
      },
      no_telp: {
        type: Sequelize.DataTypes.STRING(13),
        required: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING(20),
        required: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        required: true,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
      },
      deleted_at: {
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  }
};
