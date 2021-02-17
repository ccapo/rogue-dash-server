const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || "dev";
const config = require(path.join(__dirname, '..', 'config', 'config.js'))[env];

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db);

let db = {};
const filebasename = path.basename(__filename);

fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== filebasename) && (file !== "index.js") && (file.slice(-3) === '.js');
}).forEach((file) => {
  const model = require(path.join(__dirname, file))(sequelize, DataTypes)
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
