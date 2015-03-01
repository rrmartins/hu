var
  app        = require('../../app'),
  config     = require('../../config/config'),
  connection = require('../../db').getInstance(),
  request    = require('supertest')(app);

function context(description, spec) {
  describe(description, spec);
};

describe('#status', function(){
  context('success', function(){
    it('response with status 200', function(done){
      request
      .get('/status')
      .send()
      .end(function(error, response){
        expect(response.status).toEqual(200);
        done();
      });
    });
  });
});
