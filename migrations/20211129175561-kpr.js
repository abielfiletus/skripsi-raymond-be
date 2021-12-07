'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('kpr', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bank_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'bank',
          key: 'id',
        },
        required: true,
      },
      pengenalan: {
        type: Sequelize.DataTypes.TEXT,
        required: true,
      },
      proses_aplikasi: {
        type: Sequelize.DataTypes.TEXT,
        required: true,
      },
      syarat_pengajuan: {
        type: Sequelize.DataTypes.TEXT,
        required: true,
      },
      dokumen_diperlukan: {
        type: Sequelize.DataTypes.TEXT,
        required: true,
      },
      note: {
        type: Sequelize.DataTypes.TEXT,
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
    await queryInterface.dropTable('kpr');
  }
};
