const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || process.env.PORT_ELS|| 3939;

app.use(cors({
  origin: '*',
  methods: ['GET, POST, OPTIONS'],
  allowHeaders: 'content-type, accept',
  credentials: true,
  maxAge: 10,
}));

app.use(bodyParser.json());

// test routes for DB
const controllers = require('./events/controller');
app.post('/listening/clicks', controllers.hearClick);
// end test route for DB

app.listen(port, (err) => {
  if (err) {
    return process.stdout
    .write(`Error on listening server: ${err}\n`);
  }
  return process.stdout
  .write(`Listening server online at http://${host}:${port}. Use <ctrl-c> to stop server.\n`);
});

module.exports = app;
