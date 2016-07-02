const passport = require('passport');
const dbQry = require('./db/dbQueries');

exports.signin = passport.authenticate('local', { successRedirect: '/dashboard' }); // TODO: implement flash
exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  dbQry.createClient(email, password, (err, response) => {  // TODO: validate email and password here
    if (err) {
      return next(err); // error code 500
    }
    if (response === false) {
      return res.status(400).json({ message: 'User with this email address already exists' });
    }
    return req.login(response, (error) => {
      if (error) { return next(error); }
      return res.redirect('/dashboard');
    });
  });
};

exports.checkAuthServer = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    return res.status(401).json({ message: 'not logged in' });
  }
};
