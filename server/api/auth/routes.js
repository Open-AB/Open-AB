const authController = require('./controller');

module.exports = (app) => {
  app.post('/api/signin', authController.signin);
  app.post('/api/signout', authController.signout);
  app.post('/api/signup', authController.signup);
  app.post('/api/checkAuthServer', authController.checkAuthServer, authController.simpleMsg);
  app.get('/api/verify', authController.verify);
};
