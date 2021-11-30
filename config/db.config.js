'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const glob = require("glob");

let connectionOption = {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: 100,
    min: 0,
    acquire: 100 * 1000,
  },
};

const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  connectionOption
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Postgresql connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the postgresql database:', err);
  });

const files = glob.sync('**/*.model.js', { cwd: __dirname + '/../modules' });
files.map(file => {
  const model = require(`../modules/${file}`)(sequelize, DataTypes);
  db[model.name] = model;
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].association) {
    db[modelName].association(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
