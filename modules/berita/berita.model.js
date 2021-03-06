'use strict';

module.exports = (sequelize, DataTypes) => {
  const Berita = sequelize.define('berita', {
    title: {
      type: DataTypes.STRING,
      required: true,
    },
    image: {
      type: DataTypes.STRING,
      required: true,
    },
    link: {
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

  Berita.association = (models) => {
    Berita.belongsTo(models.user, { as: 'user', foreignKey: 'created_by' });
  };

  return Berita;
}