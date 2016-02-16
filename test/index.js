var peafowl = require('../index.js'),
    addPage = peafowl.addPage,
    removePage = peafowl.removePage;

describe('Global', function() {

  describe('#addPage()', function() {
    it('adds the page and returns true', function() {
    removePage('page1');
    });
  });

  describe('#removePage()', function() {
    it('removes the page and returns true', function() {
    removePage('page1');
    });
  });

});
