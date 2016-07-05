// Developer Enviornment Middleware
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../webpack.config');

// Node-Express Server & Middleware
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Passport Configuration
const authConfig = require('./auth/passportConfig.js');
const flash = require('connect-flash');

// Routes
const authRoutes = require('./auth/routes.js');
const analyticsRoutes = require('./analytics/routes.js');
const selectionRoutes = require('./selection/routes.js');

// Express Server
const app = express();

// Environment Variables
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || process.env.PORT_API || 8080;
console.error = process.env.NODE_ENV === 'errorTest' ? () => {} : console.error;

// Middleware for Developers
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));


// Express Middleware
app.use(express.static(`${__dirname}/../../client`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('cheese'));
app.use(flash());

// Passport Setup
authConfig(app);

// Routing
authRoutes(app);
analyticsRoutes(app);
selectionRoutes(app);

app.get('*', (req, res) => {
  if (req.user && req.isAuthenticated()) {
    res.status(200).json({ loggedIn: true });
  } else {
    res.redirect('/');
  }
});

app.listen(port, (err) => {
  if (err) {
    return process.stdout
    .write(`Error on API server: ${err}\n`);
  }
  return process.stdout
  .write(`API server online at http://${host}:${port}. Use <ctrl-c> to stop server.\n`);
});

module.exports = app;
