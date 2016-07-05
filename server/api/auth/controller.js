const passport = require('passport');
const dbQry = require('./db/dbQueries');

exports.signin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.status(401).send(info); }

    const userInfo = {
      id: user.id,
      email: user.email,
    };

    console.log(user, '&&&&&&& user for req.login from passport');

    req.login(userInfo, error => {
      if (error) {
        console.log(error, '<<<< ERROR TRYING TO ATTACH USER TO REQ');
        res.status(401).send(error);
      } else {
        // res.header("Access-Control-Allow-Credentials", true);
        // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
        // res.json(userInfo);
        res.redirect('/dashboard');
      }
    });
  })(req, res, next);
};

exports.signout = (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destorying session on signout: ', err);
      return next(err);
    }
    if (!req.isAuthenticated()) {
      return res.redirect('/');
    }
  });
};

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
    const user = response.rows[0];
    console.log('>>>>', user, '<<<<<<<< user pulled from response to db ');
    return req.login(user, (error) => {
      console.log(user, '<<<<< response from dbQry createClient');
      if (error) { return next(error); }
      return res.redirect('/dashboard');
    });
  });
};

exports.checkAuthServer = (req, res, next) => {
  if (req.user && req.isAuthenticated()) {
    return next();
  } else if (!req.user && !req.isAuthenticated()) {
    req.user = {};
    req.user.email = 'DEMO';
    console.log(req.user, '@@@@@@@@@@ THIS IS THE DEFAULT req.user demo');
    return next();
  } else {
    console.log('NO req.user SO 401 in checkAuthServer');
    return res.status(401).send({ message: 'not logged in' });
  }
};

exports.simpleMsg = (req, res, next) => {
  console.log(req.user, '<<<<< got past checkAuthServer, is there default user?!');
  res.send('PASSED CHECKAUTHSERVER' + JSON.stringify(req.user));
};
