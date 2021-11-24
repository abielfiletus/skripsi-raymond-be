'use strict';

module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define('banner', {
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    image: {
      type: DataTypes.STRING,
      required: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  }, {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Banner.association = () => {};

  return Banner;
}