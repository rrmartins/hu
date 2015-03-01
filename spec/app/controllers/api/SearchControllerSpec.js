var
  Controller = require('../../../../app/controllers/api/SearchController'),
  controller = new Controller(),
  sinon      = require('sinon');

function context(description, spec){
  describe(description, spec);
}

describe('SearchController', function() {
  describe('#index', function(){
    context('list hotels', function(){
      it('returns all', function(){
        //given
        var
          hotel    = 'all hotels',
          callback = jasmine.createSpy('callback');

        // when
        sinon.stub(controller.Model, 'search').yields(hotel);

        controller.search(callback);

        // then
        expect(callback).toHaveBeenCalledWith('all hotels');

        controller.Model.search.restore();
      });
    });
  });
});
