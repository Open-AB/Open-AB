const analyticsController = require('./controller');
const authController = require('../auth/controller');

module.exports = (app) => {
  app.get('/api/dashData', authController.checkAuthServer, analyticsController.getAllResults);
  app.get('/api/results', analyticsController.getAll);
  app.post('/api/createTest', authController.checkAuthServer, analyticsController.createTest);

  app.get('/api/getClientTests', authController.checkAuthServer, analyticsController.getClientTests);

  app.get('/api/getAllClientClicks', authController.checkAuthServer, analyticsController.getAllClientClicks);
  app.get('/api/getAllClientVisits', authController.checkAuthServer, analyticsController.getAllClientVisits);
  app.get('/api/getVersions', authController.checkAuthServer, analyticsController.getVersions);
  app.get('/api/mapData', authController.checkAuthServer, analyticsController.getmapResults);
  app.post('/api/createTest', analyticsController.createTest);
};
