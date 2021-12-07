'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('kpr_interest', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      kpr_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'kpr',
          key: 'id',
        },
        required: true,
      },
      pinjaman_min: {
        type: Sequelize.DataTypes.DOUBLE,
        required: true,
      },
      pinjaman_max: {
        type: Sequelize.DataTypes.DOUBLE,
        required: true,
      },
      tenor_min: {
        type: Sequelize.DataTypes.INTEGER,
        required: true,
      },
      tenor_max: {
        type: Sequelize.DataTypes.INTEGER,
        required: true,
      },
      suku_bunga: {
        type: Sequelize.DataTypes.DOUBLE,
        required: true,
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
    await queryInterface.dropTable('kpr_interest');
  }
};
