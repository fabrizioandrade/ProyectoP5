const cookieParser = require('cookie-parser');
const express=require('express');
const morgan = require('morgan');
const app=express()
const cors=require('cors');
const { DB_PORT } = require('./config');
const db=require('./models')













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
app.use(express.json())


/**
 * Middleware para analizar las cookies en las solicitudes.
 * 
 * @function
 * @memberof module:app
 * @name cookieParser
 */
app.use(cookieParser());


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
 * Ruta de inicio para verificar si el servidor está funcionando correctamente.
 * 
 * @function
 * @memberof module:app
 * @name GET /
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
  app.get("/", (req, res) => {
    res.send("<h1>TRASH TALK</h1>");
  });

  

  /**
 * Sincronizar la base de datos y escuchar en el puerto especificado.
 * 
 * @function
 * @memberof module:app
 * @name db.sync
 * @param {Object} options - Opciones de sincronización de la base de datos.
 */
  db.sync({ force: false }).then(() => {
    app.listen(DB_PORT, () => {
      console.log(`Servidor escuchando en el puerto ${DB_PORT}`);
    });
  });
  