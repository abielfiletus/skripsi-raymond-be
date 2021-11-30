'use strict';

module.exports = (sequelize, DataTypes) => {
  const KtaInterest = sequelize.define('kta_interest', {
    kta_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'kta',
        key: 'id',
      },
      required: true,
    },
    pinjaman_min: {
      type: DataTypes.DOUBLE,
      required: true,
    },
    pinjaman_max: {
      type: DataTypes.DOUBLE,
      required: true,
    },
    tenor_min: {
      type: DataTypes.INTEGER,
      required: true,
    },
    tenor_max: {
      type: DataTypes.INTEGER,
      required: true,
    },
    suku_bunga: {
      type: DataTypes.DOUBLE,
      required: true,
    },
  }, {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  KtaInterest.association = () => {};

  return KtaInterest;
}