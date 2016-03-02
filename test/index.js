var bc = require('../src/index.js');
var assert = require('chai').assert;


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


    bc.visit('t00000002', 'login?v=4');

    var test1 = bc.visit('t00000002', 'login?v=4');

    bc.visit('t00000002', 'login');

    bc.visit('t00000002', 'login');
    bc.visit('t00000002', 'login');
    console.log(bc.visit('t00000002', 'login', test1));

    // registerConversion(id, variant ,cookie, reward);
    // console.log(registerConversion('t00000002','login?v=4', test1, 0.1));
    // console.log(registerConversion('t00000002','login?v=4', test1, 1));
  bc.registerConversion('t00000002','login?v=4', test1, 0.5);
  bc.registerConversion('t00000002','login?v=4', test1, 0.1);
  bc.registerConversion('t00000002','login?v=4', test1, 1);
  bc.registerConversion('t00000002','login?v=4', test1, 1);
  bc.registerConversion('t00000002','login?v=4', test1, 1);
  bc.registerConversion('t00000002','login?v=4', test1, 0.5);
  //bc.visit('t00000002','login', test1);
  //var weight = [0.5, 0.2, 0.8, 0.4]

  // for (var i = 100 - 1; i >= 0; i--) {
  //   bc.visit('t00000002','login');
  //   bc.registerConversion('t00000002',('login?v='+Math.floor(Math.random() * 4 + 1)), test1, Math.random());
  // }
   console.log(bc.getCampaigns()[1].stats);
    // console.log(bc.getCampaigns()[1].values);
  //   console.log(bc.getCampaigns()[1].visits);

});


