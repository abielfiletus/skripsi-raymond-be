'use strict';

module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define('berita', {
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    logo: {
      type: DataTypes.STRING,
      required: true,
    },
    description: {
      type: DataTypes.TEXT,
      required: true,
    },
  }, {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });

  Bank.association = () => {};

  return Bank;
}