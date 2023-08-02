const passport = require('passport');
/**
 * Middleware que inicia el proceso de autenticación con Google OAuth2.
 * Redirige al usuario al sitio de Google para iniciar sesión o autorizar la aplicación.
 * @function
 * @name googleLogin
 * @memberof module:middlewares/google.middleware
 * @instance
 */
const googleLogin = passport.authenticate("google", { scope: ["profile", "email"] });

/**
 * Middleware que procesa la respuesta de autenticación de Google y llama al callback de autenticación.
 * @function
 * @name googleCallback
 * @memberof module:middlewares/google.middleware
 * @instance
 * @param {Object} req - Objeto de solicitud (request).
 * @param {Object} res - Objeto de respuesta (response).
 * @param {Function} next - Función de middleware para pasar al siguiente middleware.
 */
const googleCallback = passport.authenticate("google", { session: false });

/**
 * Middleware que maneja la autenticación de Google utilizando Passport.js.
 * @module middlewares/google.middleware
 */
module.exports = { googleLogin, googleCallback };