const { validateToken } = require("../config/tokens");

/**
 * Middleware para verificar si el usuario tiene permisos de administrador.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware o controlador.
 */

const validateAdmin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Acceso no autorizado. Token no encontrado.");
  }

  try {
    const payload = validateToken(token);

    if (payload.role === "admin") {
      req.user = payload;
      return next(); 
    }

    res.status(401).send("Acceso denegado. Se requiere permiso de administrador.");
  } catch (error) {
    res.status(401).send("Acceso no autorizado. Token inválido.");
  }
};

module.exports = validateAdmin;