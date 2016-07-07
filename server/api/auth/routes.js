const authController = require('./controller');
const analyticController = require('../analytics/controller');

module.exports = (app) => {
  app.post('/api/signin', authController.signin);
  app.post('/api/signout', authController.signout);
  app.post('/api/signup', authController.signup, authController.checkAuthServer, analyticController.createTest);
  app.post('/api/checkAuthServer', authController.checkAuthServer, authController.simpleMsg);
  app.get('/api/verify', authController.verify);
};
