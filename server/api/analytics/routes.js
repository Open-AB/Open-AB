const analyticsController = require('./controller');

module.exports = (app) => {
  app.get('/api/results', analyticsController.getAll);
  app.get('/api/stats', analyticsController.getAllStats);
  app.post('/api/createTest', analyticsController.createTest);
 // app.post('/api/clicksMap', analyticsController.getclicksMap);

  app.get('/api/chartData', analyticsController.getChartData);
};
