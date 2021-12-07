'use strict';

module.exports = (sequelize, DataTypes) => {
  const Kta = sequelize.define('kpr', {
    bank_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'bank',
        key: 'id',
      },
      required: true,
    },
    pengenalan: {
      type: DataTypes.TEXT,
      required: true,
    },
    proses_aplikasi: {
      type: DataTypes.TEXT,
      required: true,
    },
    syarat_pengajuan: {
      type: DataTypes.TEXT,
      required: true,
    },
    dokumen_diperlukan: {
      type: DataTypes.TEXT,
      required: true,
    },
    note: {
      type: DataTypes.TEXT,
      required: true,
    },
  }, {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Kta.association = (models) => {
    Kta.belongsTo(models.bank, { foreignKey: 'bank_id', as: 'bank' });
    Kta.hasMany(models.kpr_interest, { foreignKey: 'kpr_id', as: 'kpr_interest' });
  };

  return Kta;
}