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

    req.login(userInfo, error => {
      if (error) {
        res.status(401).send(error);
      } else {
        const userLoggedIn = Object.assign(userInfo, { loggedIn: true });
        res.json(userLoggedIn);
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

    // create initial page for user
    dbQry.createPage(user.email, (pageErr) => {
      if (pageErr) {
        return next(pageErr); // error code 500
      }
      return req.login(user, (error) => {
        if (error) { return next(error); }
        if (req.signedCookies.snippet) {
          return next();
        }
        const userLoggedIn = Object.assign(user, { loggedIn: true });
        return res.json(userLoggedIn);
      });
    });
  });
};

exports.checkAuthServer = (req, res, next) => {
  if (req.user && req.isAuthenticated()) {
    return next();
  }

  if (!req.user && !req.isAuthenticated()) {
    req.user = {};
    req.user.email = 'DEMO';
    return next();
  }

  return res.status(401).send({ message: 'not logged in' });
};

exports.simpleMsg = (req, res, next) => {
  console.log(req.user, '<<<<< got past checkAuthServer, is there default user?!');
  const loggedIn = req.user.email !== 'DEMO';
  const data = Object.assign({ loggedIn }, req.user);
  res.send(data);
};

exports.verify = (req, res) => {
  if (req.user && req.isAuthenticated()) {
    const data = Object.assign({ loggedIn: true }, req.user);
    return res.status(200).send(data);
  }
  return res.status(401).send({ loggedIn: false });
};
