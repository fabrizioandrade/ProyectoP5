const Sequelize = require("sequelize");
const db = require("../config/db.js");

class Favorites extends Sequelize.Model {}

Favorites.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  { sequelize: db, modelName: "favorites", timestamps: false }
);

module.exports = Favorites;
