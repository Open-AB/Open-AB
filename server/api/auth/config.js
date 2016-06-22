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

  // const dummyLookForUserInDB = (cb) => {
  //   cb(null, {email: 'ben@gmail.com', password: '$2a$10$yZct6A/xiP55dFJI9RRabO8y4dcpydRCTqkCLE9GzzJjl35X9huuu'}); //{error: 'dummyLookForUserInDB error'} 
  // };

  // const dummyUserFind = (id, cb) => {
  //   cb(null, {email: 'ben@gmail.com', password: '$2a$10$yZct6A/xiP55dFJI9RRabO8y4dcpydRCTqkCLE9GzzJjl35X9huuu'});
  // };

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      dbQry.signIn(email, password, (err, result) => { //this is where to query the db
        if (err) { return done(err); } //erroring works well here, sends a 500
        if (!result) {
          console.log('no user');
          return done(null, false, { message: 'Incorrect email.' });  //still need to test this erroring
        }
        let user = result.rows[0];
        console.log('password:', password);
        console.log('user', user);
        if (!bcrypt.compareSync(password, user.password)) {  //still need to test this erroring
          console.log('wrong password');
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log('logging in');
        return done(null, user);
      });
    }
  ));

  passport.serializeUser((user, done) => {
    console.log('serializeUser:', user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    // User.findById(id, (err, user) => {
    // dummyUserFind(id, (err, user) => {
    //   console.log('deserialed user:', user);
    //   done(err, user);
    // });
    done(null, user);
  });
};
