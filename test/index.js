var bc = require('../src/index.js');
var assert = require('chai').assert;

describe('bc interface', function() {

  describe('#removeCampaign()', function() {
    it('removes the page and returns true', function() {
      assert.equal(bc.removeCampaign('t00000002'), true);
    });
  });

  describe('#removeCampaign()', function() {
    it('removes the page and returns true', function() {
      assert.equal(bc.removeCampaign('t00000002'), true);
    });
  });

  bc.addCampaign('t00000001',
   'https://www.example.com',
   'register',
   ['register?v=1','register?v=2', 'register?v=3', 'register?v=4']);

  bc.addCampaign('t00000002',
   'https://www.example.com',
   'login',
   ['login?v=1','login?v=2', 'login?v=3', 'login?v=4']);

  bc.visit('t00000002', 'login?v=4');

  var test1 = bc.visit('t00000002', 'login?v=4');
  bc.visit('t00000002','login?v=4');
  var test2 = bc.visit('t00000002', 'login', test1.cookie);
  bc.registerConversion('t00000002','login?v=4', test1.cookie, 0.5);
  bc.visit('t00000002', 'login');
  bc.visit('t00000002', 'login');
  bc.registerConversion('t00000002','login?v=4', test1, 1);
  //bc.getCampaigns()[1];
});


