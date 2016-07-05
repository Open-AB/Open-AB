const expressSession = require('express-session');
const pg = require('pg');
const pgSession = require('connect-pg-simple')(expressSession);
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;

const dbQry = require('./db/dbQueries');
const clientLink = require('./config');

module.exports = (app) => {
  app.use(expressSession({
    secret: 'keyboard cat',
    saveUninitialized: false,
    store: new pgSession({
      pg: pg,
      conString: clientLink,
    }),
    resave: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 days in ms

  }));

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
        delete user.password;
        return done(null, user);
      });
    }
  ));

  // Attaches what user info to the req.session.passport.user
  // Also gets attached to req.user
  passport.serializeUser((user, done) => {
    const userInfo = {
      id: user.id,
      email: user.email,
    };
    done(null, userInfo);

    // done(null, user);
  });

  passport.deserializeUser((user, done) => { // TODO: deserialize user if necessary
    // const userInfo = {
    //   id: user.id,
    //   email: user.email,
    // };
    // done(null, userInfo);
    console.log('&&&&&&&&&&&&&&&', user, '&&&&&&& user in passport.deserializeUser');
    done(null, user);
  });
};
