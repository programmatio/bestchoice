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
    this.visits = [];

  };
  init(counts = 0, values = 0){
    var len = this.variants.length;
    var counts = new Array(len).fill(0);
    var values = new Array(len).fill(0);
    this.stats = new EpsilonGreedy(0.1,counts,values);
    return true;
  };
}; 

// Get running campaign
var getCampaign = function(id) {
  var _id = id;
  var findId = function (campaign) { 
      return campaign.id === _id;
  }
  return campaigns.find(findId);
};

// Get unconverted visit 
var getVisit = function(id, cookie) {
  var _id = getCampaign(id);
  var _cookie = cookie;
  var findCookie = function (visit) { 
      return visit.cookie === _cookie;
  }
  var _timeNow = new Date().getTime();
  var _visit = _id.visits.find(findCookie);


  var _minutesPassed =   Math.round(((_timeNow - _visit.time ) / 1000)/60);

  // Remove tracking if it was over 30 min since page visit
  if (_minutesPassed > 60) {
    _id.visits.splice(_id.visits.indexOf(_id.visits.find(findCookie)), 1);
  };

};

// Register variant visit
var registerVisit = function(id, variant, cookie) {
  var time = new Date().getTime();
  var id = getCampaign(id);
  var variant = id.variants.indexOf(variant);
  id.visits.push({time:time, cookie:cookie, variant:variant})
  return cookie;
};


module.exports = {

  // Add page to the Campaign
  addCampaign: function(id, baseURL, target, variants) {
    var _id = id;
    campaigns.push( id = new Campaign(id, baseURL, target, variants));
    getCampaign(_id).init();
  },

  // Remove page from the Campaign
  removeCampaign: function(id) {
    campaigns.splice(campaigns.indexOf(id),1);
    return true;
  },

  // Return all availible campaigns
  getCampaigns: function() {
    return campaigns;
  },

  // Load campaigns from JSON file
  loadCampaigns: function(data) {
    campaigns = JSON.parse(data);
  },

  // Register visit
  visit: function(id, variant, cookie = 0){
    var _id = id;
    var _variant = variant;
    if (cookie === 0) {
      var _cookie = Math.random().toString(36).slice(2);
      registerVisit(_id, _variant, _cookie);
      return _cookie;
    } else {
      var _cookie = cookie;
      return getVisit(_id, _cookie);
    }
  },

  // Register variant conversion
  registerConversion : function(id, variant, cookie, reward = 1) {
    var id = getCampaign(id);
    var variant = id.variants.indexOf(variant);
    id.stats.update(variant, reward);
    return true;
  }

};
