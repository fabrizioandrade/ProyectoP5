// config/passport.config.js
const passportConfig = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Users = require('../models/Users.models');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('./envs');
const { faker } = require('@faker-js/faker');
const { generateToken } = require('./tokens');
passportConfig.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/users/auth/google/callback',
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await Users.findOne({ where: { email: profile.emails[0].value } });
        if (!user) {
          const randomPassword=faker.string.numeric(5)

          const userData={ name:profile.displayName, email:profile.emails[0].value, password:randomPassword, phone:faker.phone.number().replace(/\D/g, ''), code:'' }
          // Si el usuario no existe, crearlo en la base de datos
          user = await Users.create(userData);
        }
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        };
        const token = generateToken(payload);
        return done(null, { data:payload, token:token,success:true,status:200 });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passportConfig.serializeUser((user, done) => {
  done(null, user.data.id);
});

passportConfig.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passportConfig;
