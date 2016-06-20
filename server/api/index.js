const express = require('express');
const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/../../client`));

app.get('/', (req, res) => {
  res.send('serving up static files!');
});

// test routes for DB
const controllers = require('./analytics/controllers');
app.get('/api/results', controllers.getAll);
app.post('/api/createTest', controllers.createTest);
// end test route for DB

app.listen(port, (err) => {
  if (err) {
    return process.stdout
    .write(`Error on listening server: ${err}\n`);
  }
  return process.stdout
  .write(`API server online at http://${host}:${port}. Use <ctrl-c> to stop server.\n`);
});
