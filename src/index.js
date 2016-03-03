let EpsilonGreedy = require('./lib/epsilon-greedy.js');
let UCB1 = require('./lib/ucb1.js');

var campaigns = [];

class Campaign {
  constructor(campaignID, baseURL, pathname, variants) {
    this.campaignID = campaignID;
    this.baseURL = baseURL;
    this.pathname = pathname;
    this.variants = variants;
    this.stats = [];
    this.visits = [];
  };
  init(counts = 0, values = 0) {
    var len = this.variants.length;
    var counts = new Array(len).fill(0);
    var values = new Array(len).fill(0);
    this.stats = new EpsilonGreedy(0.1, counts, values);
    return true;
  };
};

// Get running campaign
var getCampaign = function(campaignID) {
  var campaignID = campaignID;
  var findId = function(campaign) {
    return campaign.campaignID === campaignID;
  }
  return campaigns.find(findId);
};

var checkForExpiredVisits = function(campaignID) {
  var timeNow = new Date().getTime();

  var campaignIndex = campaigns.map(function(e) {
    return e.campaignID;
  }).indexOf(campaignID);


  var cleanList = campaigns[campaignIndex].visits.filter(function(e) {
    var minutesPassed = Math.round(((timeNow - e.time) / 1000) / 60);

    if (minutesPassed < 60) {
      var variant = e.variant;
      var reward = 0;
      campaigns[campaignIndex].stats.update(variant, reward);
      return true;
    } else {
      return false;
    }

  });

  campaigns[campaignIndex].visits = cleanList.slice(0);

  return cleanList;

}

var findCookie = function(cookie) {
  var campaign = getCampaign(campaignID);
  var cookiePosition = campaign.visits.map(function(e) {
    return e.cookie;
  }).indexOf(cookie);

}

// Get unconverted visit 
var getVisit = function(campaignID, cookie, variant) {
  var campaign = getCampaign(campaignID);
  var variantID = campaign.variants.indexOf(variant);
  var cookie = cookie;
  var findCookie = function(visit) {
    return visit.cookie === cookie;
  }

  return campaign.variants[campaign.stats.selectArm()];

};

// Register variant visit
var registerVisit = function(campaignID, pathname, cookie) {
  var time = new Date().getTime();
  var campaignID = getCampaign(campaignID);
  var variant = campaignID.variants.indexOf(pathname);
  campaignID.visits.push({
    time: time,
    cookie: cookie,
    variant: variant
  })
  return cookie;
};

module.exports = {

    // Add page to the Campaign
    addCampaign: function(campaignID, baseURL, pathname, variants) {
      var _campaignID = campaignID;
      campaigns.push(campaignID = new Campaign(campaignID, baseURL, pathname, variants));
      getCampaign(_campaignID).init();
      return true;
    },

    // Remove page from the Campaign
    removeCampaign: function(campaignID) {
      campaigns.splice(campaigns.indexOf(campaignID), 1);
      return true;
    },

    // Return all availible campaigns
    getCampaigns: function() {
      return campaigns;
    },

    // Return all availible campaigns as JSON
    saveCampaigns: function() {
      return JSON.stringify(campaigns);
    },

    // Load campaigns from JSON file
    loadCampaigns: function(data) {
      campaigns = JSON.parse(data);
      return true;
    },


    // Register visit
    visit: function(campaignID, pathname, cookie = 0) {
      var test = campaignID;
      var campaignID = campaignID;
      var campaign = getCampaign(campaignID);
      var pathname = pathname;

      if (cookie === 0) {
        var variant = campaign.variants[campaign.stats.selectArm()];;
        checkForExpiredVisits(campaignID);
        var cookie = Math.random().toString(36).slice(2);
        registerVisit(campaignID, variant, cookie);
        return {
          pageVariant: getVisit(campaignID, cookie, variant),
          cookie: cookie
        }
      } else {
        var cookie = cookie;

        return {
          pageVariant: getVisit(campaignID, cookie, variant),
          cookie: cookie
        }
      }

    },

    // Register variant conversion
    registerConversion: function(campaignID, pathname, cookie, reward = 1) {
      var campaign = getCampaign(campaignID);
      var variantID = campaign.variants.indexOf(pathname);
      var cookie = cookie;
      var findCookie = function(visit) {
        return visit.cookie === cookie;
      }

      var cookiePosition = campaign.visits.map(function(e) {
        return e.cookie;
      }).indexOf(cookie);
      if (cookiePosition === -1) {
        return registerVisit(campaignID, pathname, cookie)
      }
      var variant = campaign.variants.indexOf(pathname);
      campaign.stats.update(variant, reward);
      campaign.visits.splice(cookiePosition, 1);
      return true;
    }

  };
