const analyticsController = require('./controller');

module.exports = (app) => {
  app.get('/api/dashData', analyticsController.getAllResults);
  app.post('/api/createTest', analyticsController.createTest);
};
