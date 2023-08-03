const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const { DB_PORT} = require("./config/envs");
const db = require("./models");
const router = require("./routes");
const passport = require("passport");
const passportConfig=require('./config/passport.config')
const session = require('express-session')
/**
 * Middleware para registrar las solicitudes y respuestas en la consola durante el desarrollo.
 *
 * @function
 * @memberof module:app
 * @name morgan
 * @param {string} format - El formato de registro que se utilizará.
 */
app.use(morgan("dev"));

/**
 * Middleware para analizar los datos JSON de la solicitud.
 *
 * @function
 * @memberof module:app
 * @name express.json
 */
app.use(express.json());

app.use(
  session({
    secret: "mi_secreto_super_seguro",
    resave: false,
    saveUninitialized: false,
  })
);

/**
 * Middleware para analizar las cookies en las solicitudes.
 *
 * @function
 * @memberof module:app
 * @name cookieParser
 */
app.use(cookieParser());






app.use(passport.initialize());
app.use(passport.session());

/**
 * Middleware para habilitar CORS y configurar las opciones de origen y credenciales.
 *
 * @function
 * @memberof module:app
 * @name cors
 * @param {Object} options - Opciones de configuración de CORS.
 */
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);






/**
 * Middleware para manejar las rutas de la API.
 *
 * @name routes
 * @type {Router}
 * @memberof module:app
 */

app.use("/api", router);



/**
 * Sincronizar la base de datos y escuchar en el puerto especificado.
 *
 * @function
 * @memberof module:app
 * @name db.sync
 * @param {Object} options - Opciones de sincronización de la base de datos.
 */
db.sync({ force:false }).then(() => {
  app.listen(DB_PORT, () => {
    console.log(`Servidor escuchando en el puerto ${DB_PORT}`);
  });
});
