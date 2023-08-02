const passport = require('passport');

const googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

// Función de callback para la redirección de Google
const googleCallback = passport.authenticate('google', {
  failureRedirect: '/login', // Redirigir en caso de fallo de autenticación
  successRedirect: '/', // Redirigir en caso de éxito de autenticación
});

module.exports = { googleLogin, googleCallback };