const authController = require('./controller');

module.exports = (app) => {
  app.post('/api/signin', authController.signin);
  app.post('/api/signup', authController.signup);
};
