const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const dbQry = require('./db/dbQueries');

// const dummyCreateUser = (email, hashedPassword, cb) => {
//   console.log('user created!');
//   console.log(cb);
//   cb(null, { "email": "ben@gmail.com", "password": "abc123" }); // {error: 'dummyCreateUser error'}
// };

const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

exports.signin = passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/failure', failureFlash: true }); // could simply put in the function to deal w/ errors here, I think 

exports.signup = (req, res, next) => {  // maybe refactor so that I'm only peeling things off of rec here
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = generateHash(password);
  // console.log('hashedPassword:', hashedPassword);
  dbQry.createClient(email, hashedPassword, (err, clientId) => {  // ought to validate email and password here
    if (err) { return next(err); } // errors with a 500, which seems good; may want to redirect
    return req.login(clientId, (error) => {  // I expect this to error properly
      if (error) { return next(error); }
      // console.log('user to login with after signup:', user);
      // console.log('logged in and redirecting');
      return res.redirect('/success');
    });
  });
};

// exports.checkEmail = (req, res) => {
//   // hardcoded test vars
//   const clientEmail = 'abcd@abcd.com';
//   // end hardcoded test vars

//   dbQry.checkEmail(clientEmail, (error, result) => {
//     // result is postgres db row result
//     // result.rows[0].exists is boolean true if exists, false if not
//     res.status(201).send(result);
//   });
// };

exports.checkAuthServer = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: 'not logged in' });
  }
};
