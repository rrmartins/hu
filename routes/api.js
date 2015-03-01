var
  config         = require('../config/config'),
  logger         = require('../lib/Logger').getInstance(),
  SearchController = require('../app/controllers/api/SearchController'),
  searchController = new SearchController();

exports.search = function(request, response){
  searchController.search(request.query, function(results){
    response.status(200).send(results);
  });
};
