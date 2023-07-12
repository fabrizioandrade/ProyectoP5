
/**
 * Configuración de variables de entorno para la base de datos.
 * @module config
 */

require("dotenv").config();

module.exports = {
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_DIALECT: process.env.DB_DIALECT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  SECRET_TOKEN:process.env.SECRET_TOKEN,
  ADMIN_TOKEN:process.env.ADMIN_TOKEN
};