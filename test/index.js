var bc = require('../src/index.js'),
    assert = require('chai').assert,
    addCampaign = bc.addCampaign,
    removeCampaign = bc.removeCampaign,
    getCampaigns = bc.getCampaigns,
    visit = bc.visit,
    registerConversion = bc.registerConversion,
    loadCampaigns = bc.loadCampaigns;

    bc.addCampaign('t00000001',
                           'https://www.example.com',
                           'register',
                           ['register?v=1','register?v=2', 'register?v=3', 'register?v=4']);

    bc.addCampaign('t00000002',
                           'https://www.example.com',
                           'login',
                           ['login?v=1','login?v=2', 'login?v=3', 'login?v=4']);

    


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

    var test1 = visit('t00000002', 'login?v=4');

    visit('t00000002','login?v=4', test1);

    bc.getCampaigns()[1];


});


