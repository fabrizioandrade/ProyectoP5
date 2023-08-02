const passport = require('passport');

const googleLogin =passport.authenticate("google", { scope: ["profile", "email"] })

const googleCallback = passport.authenticate("google", { session:false})

module.exports = { googleLogin, googleCallback };