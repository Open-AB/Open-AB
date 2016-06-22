const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const authConfig = require('./auth/passportConfig.js');
const authRoutes = require('./auth/routes.js');

const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/../../client`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use(cookieParser('cheese'));
authConfig(app);
authRoutes(app);

app.get('/', (req, res) => {
  res.send('serving up static files!');
});

app.listen(port, (err) => {
  if (err) {
    return process.stdout
    .write(`Error on listening server: ${err}\n`);
  }
  return process.stdout
  .write(`API server online at http://${host}:${port}. Use <ctrl-c> to stop server.\n`);
});
