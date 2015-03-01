//
// Hotel model
//
// attr:
//    +--------+
//    | Field  |
//    +--------+
//    | name   |
//    | city   |
//    | uf     |
//    +--------+
//

var
  connection = require('../../db').getInstance(),
  config     = require('../../config/config'),
  logger     = require('../../lib/Logger').getInstance();

function Hotel(attributes, options){

}

// Search Hotels.
Hotel.search = function(query, callback){
  var query = Hotel.getParam(query);

  connection.search({
    index: config.elasticsearch.indexName,
    type:  config.elasticsearch.type,
    q: 'city: '+query
  }).then(function (body) {
    var hits = body.hits.hits;
    callback(hits);
  }, function (error) {
    console.trace(error.message);
    callback([{}]);
  });
};

Hotel.getParam = function(query){
  var param = {};
  param = "params" in query ? query.params.toString() : "*"
  return param;
}

module.exports = Hotel;
