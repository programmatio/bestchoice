var bc = require('../src/index.js');
var EpsilonGreedy = require('../src/lib/epsilon-greedy.js');
var assert = require('chai').assert;

describe('bc interface', function() {

  bc.addCampaign('t00000001',
   'http://www.test1.com/register',
   ['http://www.test1.com/register/a',
    'http://www.test1.com/register/b',
    'http://www.test1.com/register/c',
    'http://www.test1.com/register/d'],
    0.1,
    1);

  bc.addCampaign('t00000002',
   'http://www.test2.com/register',
   ['http://www.test2.com/register/a',
    'http://www.test2.com/register/b',
    'http://www.test2.com/register/c'],
    0.1,
    1);
      
  describe('#addCampaign()', function() {
    it('Creates new campaigns, test should return expected values', function() {

      assert.equal(bc.getCampaigns().length, 2);

      assert.equal(bc.getCampaigns()[0].campaignID, 't00000001');
      assert.equal(bc.getCampaigns()[1].campaignID, 't00000002');

      assert.equal(bc.getCampaigns()[0].targetURL, 'http://www.test1.com/register');
      assert.equal(bc.getCampaigns()[1].targetURL, 'http://www.test2.com/register');

      assert.equal(bc.getCampaigns()[0].variants.length, 4);
      assert.equal(bc.getCampaigns()[1].variants.length, 3);

      assert.equal(bc.getCampaigns()[0].visitsQueue.length, 0);
      assert.equal(bc.getCampaigns()[1].visitsQueue.length, 0);

      assert.equal(bc.getCampaigns()[0].stats instanceof EpsilonGreedy, true);
      assert.equal(bc.getCampaigns()[1].stats instanceof EpsilonGreedy, true);      

      assert.equal(bc.getCampaigns()[0].stats.epsilon, 0.1);
      assert.equal(bc.getCampaigns()[1].stats.epsilon, 0.1); 

      assert.equal(bc.getCampaigns()[0].stats.counts.length, 4);
      assert.equal(bc.getCampaigns()[1].stats.counts.length, 3);

      assert.equal(bc.getCampaigns()[0].stats.values.length, 4);

      assert.equal(bc.getCampaigns()[0].stats.values.length, 4);
      assert.equal(bc.getCampaigns()[1].stats.values.length, 3); 

    });
  });

  describe('#removeCampaign()', function() {
    it('removes the page and returns spliced Array', function() {

      assert.equal(bc.removeCampaign('t00000001') instanceof Array, true);
      assert.equal(bc.getCampaigns().length, 1);


      bc.addCampaign('t00000001',
       'http://www.test1.com/register',
       ['http://www.test1.com/register/a',
        'http://www.test1.com/register/b',
        'http://www.test1.com/register/c',
        'http://www.test1.com/register/d'],
        0.1,
        1);

      assert.equal(bc.getCampaigns().length, 2);
      assert.equal(bc.getCampaigns()[0].campaignID, 't00000002');
      assert.equal(bc.getCampaigns()[1].campaignID, 't00000001');

    });
  });

  describe('#getPage()', function() {
    it('Adds page to the unconverted visit queue', function() {

      for (var i = 3 - 1; i >= 0; i--) {
        bc.getPage('t00000002', 'http://www.test2.com/register');
      }
      bc.getPage('t00000002', 'http://www.test2.com/register');
      var test1 = bc.getPage('t00000002', 'http://www.test2.com/register');
      var test2 = bc.getPage('t00000002', 'http://www.test2.com/register', test1.cookie);
      var test3 = bc.getPage('t00000002', 'http://www.test2.com/register', test2.cookie);

    });
  });
  
  describe('#registerConversion()', function() {
    it('removes the page from the queue and updates current campaign statistics', function() {

      var test4 = bc.getPage('t00000002', 'http://www.test2.com/register');
      bc.registerConversion(test4.campaignID,
                            test4.pageVariant,
                            test4.cookie);

    });
  });
});


