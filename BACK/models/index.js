const Users = require("./Users.models");
const Properties = require("./Properties.models.");
const Appointments = require("./Appointments.models.");
const Favorites = require("./Favorites.models.");
const db = require("../config/db");

// Users.hasMany(Appointments, { foreignKey: "userId", as: "Appointments" });
// Appointments.belongsTo(Users, { foreignKey: "userId" });

// // Relación entre Users y Favorites
// Users.hasMany(Favorites, { foreignKey: "userId", as: "Favorites" });
// Favorites.belongsTo(Users, { foreignKey: "userId" });

// // Relación entre Properties y Appointments
// Properties.hasMany(Appointments, { foreignKey: "propertyId", as: "Appointments" });
// Appointments.belongsTo(Properties, { foreignKey: "propertyId" });

// // Relación entre Properties y Favorites (relación muchos a muchos)
// Properties.belongsToMany(Users, {
//   through: Favorites,
//   foreignKey: "propertyId",
//   otherKey: "userId",
//   as: "FavoriteByUsers"
// });
// Users.belongsToMany(Properties, {
//   through: Favorites,
//   foreignKey: "userId",
//   otherKey: "propertyId",
//   as: "FavoriteProperties"
// });

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
