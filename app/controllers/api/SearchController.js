var
  logger = require('../../../lib/Logger').getInstance(),
  model = require('../../models/hotel');

// Controller API with search in Hotel Model.
function Controller(){
  this.Model = model;
}

// List search hotel.
Controller.prototype.search = function(query, callback){
  this.Model.search(query, function(results){
    callback(results);
  });
};

module.exports = Controller;
