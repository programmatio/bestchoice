var bestchoice = require('../src/index.js'),
    assert = require('chai').assert,
    addCampaign = bestchoice.addCampaign,
    getCampaign = bestchoice.getCampaign,
    removeCampaign = bestchoice.removeCampaign,
    getCampaigns = bestchoice.getCampaigns,
    loadCampaigns = bestchoice.loadCampaigns;

    addCampaign('t001', 'https://www.hello.com', 'main', ['main?v=a', 'main?v=b', 'main?v=c', 'main?v=d']);

describe('bestchoice interface', function() {
  describe('#removeCampaign()', function() {
    it('removes the page and returns true', function() {
    assert.equal(removeCampaign('t001'), true);
    });
  });
});
