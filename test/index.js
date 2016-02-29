var bestchoice = require('../src/index.js'),
    assert = require('chai').assert,
    addCampaign = bestchoice.addCampaign,
    getCampaign = bestchoice.getCampaign,
    removeCampaign = bestchoice.removeCampaign,
    getCampaigns = bestchoice.getCampaigns,
    loadCampaigns = bestchoice.loadCampaigns;


    bestchoice.addCampaign('t00000001',
                           'https://www.example.com',
                           'register',
                           ['register?v=1','register?v=2', 'register?v=3', 'register?v=4']);

    bestchoice.addCampaign('t00000002',
                           'https://www.example.com',
                           'login',
                           ['login?v=1','login?v=2', 'login?v=3', 'login?v=4']);

    bestchoice.getCampaign('t00000001').init();
    bestchoice.getCampaign('t00000002').init();

describe('bestchoice interface', function() {
  describe('#removeCampaign()', function() {
    it('removes the page and returns true', function() {
    //assert.equal(removeCampaign('page1'), true);
    });
  });
});
