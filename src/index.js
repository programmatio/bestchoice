var EpsilonGreedy = require('./lib/epsilon-greedy.js');
var UCB1 = require('./lib/ucb1.js');

var campaigns = [];

class Campaign {
  constructor(campaignID, originalURL, variants) {
    this.campaignID = campaignID;
    this.originalURL = originalURL;
    this.variants = variants;
    this.stats = [];
    this.visitsQue = [];
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
var getCampaignByID = function(campaignID) {
  var findId = function(campaign) {
    return campaign.campaignID === campaignID;
  }
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


  var cleanList = campaigns[campaignIndex].visitsQue.filter(function(e) {
    var minutesPassed = Math.round(((timeNow - e.time) / 1000) / 60);

    if (minutesPassed > 1) {
      var variant = e.variant;
      var reward = 0;
      campaigns[campaignIndex].stats.update(variant, reward);
      return true;
    } else {
      return false;
    }

  });

  campaigns[campaignIndex].visitsQue = cleanList.slice(0);

  return cleanList;

}

var findCookie = function(cookie) {
  var campaign = getCampaignByID(campaignID);
  var cookiePosition = campaign.visitsQue.map(function(e) {
    return e.cookie;
  }).indexOf(cookie);

}

// Get unconverted visit 
var getVisit = function(campaignID, cookie, variant) {
  var campaign = getCampaignByID(campaignID);
  var variantID = campaign.variants.indexOf(variant);
  var cookie = cookie;
  var findCookie = function(visit) {
    return visit.cookie === cookie;
  }

  return campaign.variants[campaign.stats.selectArm()];

};

// Register variant visit
var registerVisit = function(campaignID, originalURL, cookie) {
  var time = new Date().getTime();
  var campaignID = getCampaignByID(campaignID);
  var variant = campaignID.variants.indexOf(originalURL);

  console.log(campaignID, originalURL, cookie)
  campaignID.visitsQue.push({
    time: time,
    cookie: cookie,
    variant: variant
  })
  console.log(cookie);
  return cookie;
};

module.exports = {

    // Add page to the Campaign
    addCampaign: function(campaignID, originalURL, variants) {
      var _campaignID = campaignID;
      campaigns.push(campaignID = new Campaign(campaignID, originalURL, variants));
      getCampaignByID(_campaignID).init();
      return true;
    },

    // Remove page from the Campaign
    removeCampaign: function(campaignID) {
      return campaigns.splice(campaigns.indexOf(getCampaignByID(campaignID)), 1);
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
    getPage: function(campaignID, originalURL, cookie = 0) {

      checkForExpiredVisits(campaignID);
      var campaign = getCampaignByID(campaignID);
      if (cookie === 0) {
        var pageToShow = campaign.variants[campaign.stats.selectArm()];
        //console.log(pageToShow);
        var cookie = Math.random().toString(36).slice(2);
        registerVisit(campaignID, pageToShow, cookie);


        return {
          pageVariant: getVisit(campaignID, cookie, pageToShow),
          cookie: cookie,
          campaignID: campaignID
        }
      } else {
        var cookie = cookie;
        return {
          pageVariant: getVisit(campaignID, cookie, originalURL),
          cookie: cookie,
          campaignID: campaignID
        }
      }

    },

    // Register variant conversion
    registerConversion: function(campaignID, originalURL, cookie, reward = 1) {

      var campaign = getCampaignByID(campaignID);
      var variantID = campaign.variants.indexOf(originalURL);
      var findCookie = function(visit) {
        return visit.cookie === cookie;
      }

      var cookiePosition = campaign.visitsQue.map(function(e) {
        return e.cookie;
      }).indexOf(cookie);
      if (cookiePosition === -1) {
        return
      }
      var variant = campaign.variants.indexOf(originalURL);
      campaign.stats.update(variant, reward);

      campaign.visitsQue.splice(cookiePosition, 1);
      return true;
    }

  };
