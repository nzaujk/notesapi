const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('./db/connection');
const bcrypt = require('bcryptjs');
const options = {};

function validatePassword(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}
passport.use(new LocalStrategy(options, (username, password, done) => {
  knex('users').where({ username }).first()
    .then((user) => {
      if (!user) return done(null, false);
      if (!validatePassword(password, user.password)) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
    .catch((err) => { return done(err); });
}));
passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((id, done) => {
  return knex('users').where({id}).first()
    .then((user) => { done(null, user); })
    .catch((err) => { done(err,null); });
});
