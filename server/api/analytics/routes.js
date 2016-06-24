const analyticsController = require('./controller');

module.exports = (app) => {
  app.get('/api/results', analyticsController.getAll);
  app.post('/api/createTest', analyticsController.createTest);
};
