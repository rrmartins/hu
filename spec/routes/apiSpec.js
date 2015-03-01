var
  app        = require('../../app'),
  config     = require('../../config/config'),
  connection = require('../../db').getInstance(),
  request    = require('supertest')(app);

function context(description, spec) {
  describe(description, spec);
};

describe('#api #hotel', function(){
  beforeEach(function(){
    var that = this;

    connection.create({
      index: config.elasticsearch.indexName,
      type:  config.elasticsearch.type,
      id: '1',
      body: {
        "name" : "Plaza Hotel", "city" : "Rio de Janeiro", "uf" : "RJ"
      }
    }, function (error, response) {
      that.create = true;
    });

    waitsFor(function(){
      return that.create !== undefined;
    });
  });

  afterEach(function(){
    var that = this;

    connection.delete({
      index: config.elasticsearch.indexName,
      type:  config.elasticsearch.type,
      id: '1'
    }, function (error, response) {
      that.delete = true;
    });

    waitsFor(function(){
      return that.delete !== undefined;
    });
  });

  describe('#search', function(){
    context('hotels', function(){
      it('returns all hotels', function(done){
        request
          .get('/api/search')
          .set('X-API-TOKEN', config.key.test.token)
          .send()
          .send()
          .end(function(error, response){
            expect(response.body.length).toEqual(1);
            done();
          });
      });
    });
  });

});
