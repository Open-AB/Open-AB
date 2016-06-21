const express = require('express');
const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/../../client`));

app.get('/', (req, res) => {
  res.send('serving up static files!');
});

// test routes for DB
const analytics = require('./analytics/controllers');
app.get('/api/results', analytics.getAll);
app.post('/api/createTest', analytics.createTest);

const auth = require('./auth/controllers');
app.post('/api/email', auth.checkEmail);
app.post('/api/signup', auth.signUp);
app.post('/api/signin', auth.signIn);
// end test route for DB

app.listen(port, (err) => {
  if (err) {
    return process.stdout
    .write(`Error on listening server: ${err}\n`);
  }
  return process.stdout
  .write(`API server online at http://${host}:${port}. Use <ctrl-c> to stop server.\n`);
});
