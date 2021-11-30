'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bank', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        required: true,
      },
      logo: {
        type: Sequelize.DataTypes.STRING,
        required: true,
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
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
    await queryInterface.dropTable('bank');
  }
};
