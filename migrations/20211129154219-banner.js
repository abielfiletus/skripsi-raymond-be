'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('banner', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        required: true,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        required: true,
      },
      created_by: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('banner');
  }
};
