var application_root = __dirname,
  bodyParser       = require('body-parser'),
  errorHandler     = require('errorhandler'),
  express          = require("express"),
  app              = express(),
  methodOverride   = require('method-override'),
  path             = require("path"),
  config           = require('./config/config');

// Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(errorHandler({ dumpExceptions: true, showStack: true }));
app.use(require('cookie-parser')());

app.set('jsonp callback', true);

// Routes
var
api     = require('./routes/api'),
key     = require('./routes/key'),
service = require('./routes/service');

// Verify api token
app.all('/api/*',      key.validate);

// Search API
app.get('/api/search', api.search);

// status
app.get('/status',     service.status);

// Launch server
app.listen(config.app.port);

module.exports = app;
