'use strict';

module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define('bank', {
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