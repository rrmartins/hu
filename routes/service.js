var
  connection = require('../db').getInstance(),
  logger     = require('../lib/Logger').getInstance();

exports.status = function(req, res){

  connection.ping({
    requestTimeout: 1000
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
      logger.error("[HU_SEARCH] elasticsearch cluster is down!");
      res.status(500).jsonp({status: 'nok'});
    } else {
      console.log('All is well');
      logger.info("[HU_SEARCH] status Ok!");
      res.status(200).jsonp({status: 'ok'});
    }
  });
};
