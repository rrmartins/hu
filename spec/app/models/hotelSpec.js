var connection = require('../../../db').getInstance(),
    config     = require('../../../config/config'),
    Hotel      = require('../../../app/models/hotel');

function context(description, spec){
  describe(description, spec);
}

describe('hotel', function(){
  describe('.search', function(){
    beforeEach(function(){
      var that = this;

      connection.create({
        index: config.elasticsearch.indexName,
        type:  config.elasticsearch.type,
        id: '1',
        refresh: true,
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

    it('returns all hotels, without params', function(){
      // given
      var that = this;

      // when
      Hotel.search({}, function(results){
        that.hotel = results;
      });

      waitsFor(function(){
        return that.hotel !== undefined;
      });

      // then
      runs(function(){
        expect(that.hotel.length).toEqual(1);
      });
    });

    it('returns all hotels, with params equal rio', function(){
      // given
      var that = this;

      // when
      Hotel.search({ params: 'rio' }, function(results){
        that.hotel = results;
      });

      waitsFor(function(){
        return that.hotel !== undefined;
      });

      // then
      runs(function(){
        expect(that.hotel.length).toEqual(1);
      });
    });

    it('returns all hotels, with params equal es', function(){
      // given
      var that = this;

      // when
      Hotel.search({ params: 'es' }, function(results){
        that.hotel = results;
      });

      waitsFor(function(){
        return that.hotel !== undefined;
      });

      // then
      runs(function(){
        expect(that.hotel.length).toEqual(0);
      });
    });

    it('returns all hotels, with params equal rio de janeiro', function(){
      // given
      var that = this;

      // when
      Hotel.search({ params: 'rio janeiro' }, function(results){
        that.hotel = results;
      });

      waitsFor(function(){
        return that.hotel !== undefined;
      });

      // then
      runs(function(){
        expect(that.hotel.length).toEqual(1);
      });
    });

    it('returns all hotels, with params equal [rio, janeiro]', function(){
      // given
      var that = this;

      // when
      Hotel.search({ params: [ 'rio', 'janeiro' ] }, function(results){
        that.hotel = results;
      });

      waitsFor(function(){
        return that.hotel !== undefined;
      });

      // then
      runs(function(){
        expect(that.hotel.length).toEqual(1);
      });
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

});
