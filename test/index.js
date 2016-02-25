var peafowl = require('../src/index.js'),
    assert = require('chai').assert,
    addPage = peafowl.addPage,
    removePage = peafowl.removePage;

describe('peafowl interface', function() {
  describe('#removePage()', function() {
    it('should add page to group', function() {
    assert.equal(addPage('page1'), true);

    });
  });

  describe('#addPage()', function() {
    it('removes the page and returns true', function() {
    removePage('page1');
    });
  });
});
