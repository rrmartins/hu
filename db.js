var config = require('./config/config'),
    elasticsearch = require('elasticsearch');

var db = {};

db.connection = function(){
  var client = new elasticsearch.Client({
      host: config.elasticsearch.host
    });

  return client;
}

var Instance = function(){
  if(Instance.prototype._singletonInstance){
    return Instance.prototype._singletonInstance;
  }

  Instance.prototype._singletonInstance = this;

  this.db = db.connection();
}

Instance.getInstance = function(){
  return new Instance().db;
}

module.exports = Instance;
