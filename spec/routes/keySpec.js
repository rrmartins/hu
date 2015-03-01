var
  app        = require('../../app'),
  config     = require('../../config/config'),
  connection = require('../../db').getInstance(),
  request    = require('supertest')(app);

function context(description, spec) {
  describe(description, spec);
};

describe('#api #key', function(){
  describe('#validateKey', function(){
    context('when anyone try acess api', function(){
      it('with correct api key', function(done){
        request
        .get('/api/search')
        .set('X-API-KEY', config.key.test.token)
        .send()
        .end(function(error, response){
          expect(response.status).toEqual(200);
          done();
        });
      });

      it('with not correct api key', function(done){
        request
        .get('/api/search')
        .set('X-API-KEY', "notCorrect")
        .send()
        .end(function(error, response){
          expect(response.status).toEqual(401);
          done();
        });
      });

      it('with api key empty', function(done){
        request
        .get('/api/search')
        .set('X-API-KEY', "")
        .send()
        .end(function(error, response){
          expect(response.status).toEqual(401);
          done();
        });
      });

      it('without correct api key', function(done){
        request
        .get('/api/search')
        .send()
        .end(function(error, response){
          expect(response.status).toEqual(401);
          done();
        });
      });
    });
  });
});
