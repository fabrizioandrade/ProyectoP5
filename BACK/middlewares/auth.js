const { validateToken } = require("../config/tokens");

/**
 * Middleware para validar el token de autenticación de un usuario.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware o controlador.
 */

let validateUser = (req, res, next) => {
  let token = req.cookies.token;
  let payload = validateToken(token);
  req.user = payload;

  if (payload !== null) {
    return next();
  }

  res.send("Inicia sesión para una experiencia completa del sitio.");
};

module.exports = validateUser;