const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');

const dummyCreateUser = (email, hashedPassword, cb) => {
  console.log('user created!');
  console.log(cb);
  cb(null, {"email": "ben@gmail.com", "password": "abc123"}); //{error: 'dummyCreateUser error'}
};

const generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

exports.signin = passport.authenticate('local', {successRedirect: '/', failureRedirect: '/', failureFlash: true}), //could simply put in the function to deal w/ errors here, I think 
  
exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = generateHash(password);
  console.log('hashedPassword:', hashedPassword);
  dummyCreateUser(email, hashedPassword, (err, user) => {  //ought to validate email and password here
    if (err) { return next(err); } //errors with a 500, which seems good
    req.login(user, function(err) {  //I expect this to error properly
        if (err) { return next(err); }
        console.log('user to login with after signup:', user);
        console.log('logged in and redirecting');
        return res.redirect('/');
      });
    }
  );
};


