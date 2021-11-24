'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    first_name: {
      type: DataTypes.STRING(20),
      required: true,
    },
    last_name: {
      type: DataTypes.STRING(20),
      required: true,
    },
    gender: {
      type: DataTypes.CHAR(1),
      required: true,
    },
    email: {
      type: DataTypes.STRING(50),
      required: true,
    },
    no_telp: {
      type: DataTypes.STRING(13),
      required: true,
    },
    username: {
      type: DataTypes.STRING(20),
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    }
  }, {
    paranoid: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });

  User.association = () => {};

  return User;
}