const Sequelize = require("sequelize");
const db = require("../config/db.js");


class Appointments extends Sequelize.Model {}


Appointments.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    dateStatus: {
      type: Sequelize.ENUM("pending", "confirmed", "rejected"),
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "appointments", timestamps: false }
);

module.exports=Appointments;