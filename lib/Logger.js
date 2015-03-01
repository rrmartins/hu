var config  = require('../config/config'),
    winston = require('winston');

var Logger = {};

process.env.TZ = 'America/Sao_Paulo';

Logger.create = function(out, error) {
  var that = this;

  return new winston.Logger({
    exitOnError       : false,
    exceptionHandlers : that.transports(error),
    transports        : that.transports(out)
  });
};

Logger.levels = function() {
  var json = {
    levels: { debug: 0      , info: 1       , warn: 2        , error: 3     },
    colors: { debug: 'blue' , info: 'green' , warn: 'yellow' , error: 'red' }
  };

  if (!this.isEnv('test')) {
    winston.addColors(json.colors);
  }

  return json;
};

Logger.env = function() {
  return (process.env.NODE_ENV || 'development');
};

Logger.isEnv = function(env) {
  return process.env.NODE_ENV === env;
};

Logger.transport = function(options) {
  options.filename = config.logger[Logger.env()][options.filename];
  options.json     = false;
  options.level    = config.logger[Logger.env()].level;
  options.levels   = this.levels();

  if (options.type === 'file') {
    return new winston.transports.File(options);
  }

  return new winston.transports.Console(options);
};

Logger.transports = function(name) {
  var types = [];

  if (!this.isEnv('test')) {
    types.push(this.transport({ type: 'console' , colorize: true  }));
    types.push(this.transport({ type: 'file'    , filename: name }));
  }

  return types;
};

var Instance = function() {
  if (Instance.prototype._singletonInstance) {
    return Instance.prototype._singletonInstance;
  }

  Instance.prototype._singletonInstance = this;

  this.loggers = {
    out: Logger.create('out', 'error')
  }
};

Instance.getInstance = function(name) {
  return new Instance().loggers[name || 'out'];
}

module.exports = Instance
