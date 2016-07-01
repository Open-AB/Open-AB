const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../webpack.config');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const authConfig = require('./auth/passportConfig.js');
const authRoutes = require('./auth/routes.js');

const analyticsRoutes = require('./analytics/routes.js');

const selectionRoutes = require('./selection/routes.js');

const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || process.env.PORT_API || 8080;

if (process.env.NODE_ENV === 'errorTest') {
  console.error = () => {};
}

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(`${__dirname}/../../client`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use(cookieParser('cheese'));
authConfig(app);
authRoutes(app);
analyticsRoutes(app);
selectionRoutes(app);

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

module.exports = app;
