let EpsilonGreedy = require('./lib/epsilon-greedy.js');
let UCB1 = require('./lib/ucb1.js');

var campaigns = [];

class Campaign{
  constructor(id, baseURL, target, variants){
    this.id = id;
    this.baseURL = baseURL;
    this.target = target;
    this.variants = variants;
    this.stats = [];

  };
  init(counts = 0, values = 0){
    var len = this.variants.length;
    var counts = new Array(len).fill(0);
    var values = new Array(len).fill(0);
    this.stats = new EpsilonGreedy(0.1,counts,values);
    return true;
  };
}; 


module.exports = {

  // Add page to the Campaign
  addCampaign: function(id, baseURL, target, variants) {
    campaigns.push( id = new Campaign(id, baseURL, target, variants));
    //this.init();
  },

  // Get page from the Campaign
  getCampaign: function(id) {
    var _id = id;
    var findId = function (campaign) { 
        return campaign.id === _id;
    }
    return campaigns.find(findId);
  },

  // Remove page from the Campaign
  removeCampaign: function(id) {

    var _id = id;
    var findId = function (campaign) { 
        return campaign.id === _id;
    }
    return campaigns.splice(campaigns.indexOf(campaigns.find(findId)),1);
  },

  // Return all availible campaigns
  getCampaigns: function() {
    return campaigns;
  },

  // Load campaigns from JSON file
  loadCampaigns: function(data) {
    campaigns = JSON.parse(data);
  }


};
