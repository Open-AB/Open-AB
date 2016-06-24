const expressSession = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;

const dbQry = require('./db/dbQueries');

module.exports = (app) => {
  app.use(expressSession({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      dbQry.signIn(email, password, (err, result) => {
        if (err) { return done(err); } // error code 500
        if (!result) {
          console.log('User does not exist');
          return done(null, false, { message: 'Incorrect email.' }); // TODO: Implement flash
        }
        const user = result.rows[0];
        if (!bcrypt.compareSync(password, user.password)) {
          console.log('Incorrect password');
          return done(null, false, { message: 'Incorrect password.' }); // TODO: Implement flash
        }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser((user, done) => { // TODO: serialize user if necessary
    done(null, user);
  });

  passport.deserializeUser((user, done) => { // TODO: deserialize user if necessary
    done(null, user);
  });
};
