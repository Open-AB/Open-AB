const analyticsController = require('./controllers');

module.exports = (app) => {
  app.get('/api/getall', analyticsController.getAll);
  app.post('/api/createtest', analyticsController.createTest);
};
