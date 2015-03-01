var
  config         = require('../config/config'),
  logger         = require('../lib/Logger').getInstance();

exports.validate = function(request, response, next){
  key = request.headers['x-api-key'];

  env = process.env.NODE_ENV || 'development';

  if(key == config.key[env].token){
    logger.debug('[HU_SEARCH] x-api-key correct, the key is: '+key)
    next();
  } else {
    logger.error('[HU_SEARCH] Error to pass x-api-key correct, the key is: '+key)

    response.status(401).send('[HU_SEARCH] Error to pass x-api-key correct');
  }
};
