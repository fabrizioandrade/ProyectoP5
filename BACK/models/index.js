const Users = require("./Users.models");
const Appointments = require("./Appointments.models.");
const Favorites = require("./Favorites.models.");
const db = require("../config/db");
const Properties = require("./Properties.models.");

Users.hasMany(Appointments);
Appointments.belongsTo(Users);

Users.hasMany(Favorites);
Favorites.belongsTo(Users);

Properties.hasMany(Appointments);
Appointments.belongsTo(Properties);

Properties.belongsToMany(Favorites, {
  through: "PropertyFavorites", // Nombre de la tabla intermedia
});

Favorites.belongsToMany(Properties, {
  through: "PropertyFavorites", // Nombre de la tabla intermedia
});

module.exports = db;
