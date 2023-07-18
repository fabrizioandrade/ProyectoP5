const Sequelize = require("sequelize");
const db = require("../config/db.js");

class Properties extends Sequelize.Model {}

Properties.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    descriptionData:{
      type:Sequelize.JSON,
      allowNull:false
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    statusType:{
      type:Sequelize.STRING,
      allowNull:false
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    imgURL: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },
    neighborhood: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "properties", timestamps: false }
);

module.exports = Properties;
