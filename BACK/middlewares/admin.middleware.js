const { validateToken } = require("../config/tokens");

/**
 * Middleware para verificar si el usuario tiene permisos de administrador.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware o controlador.
 */

const validateAdmin = (req, res, next) => {
  // Obtener el token del encabezado de la solicitud o de las cookies
  const token = req.cookies.token;

  // Verificar si el token existe
  if (!token) {
    return res.status(401).send("Acceso no autorizado. Token no encontrado.");
  }

  try {
    // Decodificar el token y obtener el payload
    const payload = validateToken(token);

    // Verificar si el usuario tiene un rol de "admin"
    if (payload.role === "admin") {
      req.user = payload; // Asignar el payload al objeto req.user
      return next(); 
    }

    // Si el usuario no tiene el rol de "admin", enviar una respuesta de error
    res.status(403).send("Acceso denegado. Se requiere permiso de administrador.");
  } catch (error) {
    // Si hay un error al decodificar el token, enviar una respuesta de error
    res.status(401).send("Acceso no autorizado. Token inválido.");
  }
};

module.exports = validateAdmin;