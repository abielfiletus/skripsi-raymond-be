'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('berita', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        required: true,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        required: true,
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
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
    await queryInterface.dropTable('berita');
  }
};
