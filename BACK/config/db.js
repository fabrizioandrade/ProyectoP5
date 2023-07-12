const Sequelize = require("sequelize");
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = require(".");

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: DB_DIALECT,
  host: DB_HOST,
  logging: false,
});

module.exports = db;
