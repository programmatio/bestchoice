var EpsilonGreedy = require('./lib/epsilon-greedy.js');
var UCB1 = require('./lib/ucb1.js');

var campaigns = [];

class Campaign {
  constructor(campaignID, targetURL, variants, epsilon, frequency) {
    this.campaignID = campaignID;
    this.targetURL = targetURL;
    this.variants = variants;
    this.stats = [];
    this.visitsQueue = [];
    this.epsilon = epsilon;
    this.frequency = frequency;
  };
  init(counts = 0, values = 0) {
    var len = this.variants.length;
    var counts = new Array(len).fill(0);
    var values = new Array(len).fill(0);
    this.stats = new EpsilonGreedy(this.epsilon, counts, values);
    return true;
  };
};


// Get running campaign
var getCampaignByID = function(campaignID) {

  var findId = function(campaign) {
    return campaign.campaignID === campaignID;
  }
  return campaigns.find(findId);
};


// Find a page by cookie name
var findCookie = function(cookie) {
  var campaign = getCampaignByID(campaignID);
  var cookiePosition = campaign.visitsQueue.map(function(e) {
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
var addToVisitQueue = function(campaignID, targetURL, cookie) {
  var time = new Date().getTime();
  var campaignID = getCampaignByID(campaignID);
  var variant = campaignID.variants.indexOf(targetURL);

  campaignID.visitsQueue.push({
    time: time,
    cookie: cookie,
    variant: variant
  })
  return cookie;
};


var updateExpiredVisits = function(campaignID) {
  var timeNow = new Date().getTime();
  var campaign = getCampaignByID(campaignID);
  var campaignIndex = campaigns.map(function(e) {
    return e.campaignID;
  }).indexOf(campaignID);
  var queue = campaigns[campaignIndex].visitsQueue;


  //check every item in campaigns visits queue and remove the expired ones while adjusting the weights
  queue.filter(function(e) {
    var minutesPassed = Math.round(((timeNow - e.time) / 1000) / 60);

    // check if 
    if (minutesPassed > campaign.frequency) {
      var expiredItem = campaigns[campaignIndex].visitsQueue.splice(queue.indexOf(e), 1);
      //console.log(campaignIndex + " is the index");

      var variant = e.variant;
      //console.log(e.variant + "variant to delete");

      var reward = 0;
      campaigns[campaignIndex].stats.update(variant, reward);
      

      console.log('removed expired');
      return true;
    } else {
      return false;
    }

  });

    //campaigns[campaignIndex].visitsQueue = cleanList.slice(0);

}

module.exports = {

    // Add page to the Campaign
    addCampaign: function(campaignID, targetURL, variants, epsilon, frequency) {
      var _campaignID = campaignID;
      campaigns.push(campaignID = new Campaign(campaignID, targetURL, variants, epsilon, frequency));
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
    getPage: function(campaignID, targetURL, cookie = 0) {

      var campaign = getCampaignByID(campaignID); // get current campaign object

      // if cookie is not set
      if (cookie === 0) {

        // select the page by using the decision algorythm from availible variants
        //console.log(campaign.stats.selectArm() + "is variant to show");

        var variantToShow = campaign.variants[campaign.stats.selectArm()];



        // create a random string
        var cookie = Math.random().toString(36).slice(2);
        
        // add to the unconverted visits queue
        addToVisitQueue(campaignID, variantToShow, cookie);

        return {

          // variant URL to show
          pageVariant: getVisit(campaignID, cookie, variantToShow),
          // newly generated cookie
          cookie: cookie,
          // campaign ID
          campaignID: campaignID
        }

      }

      // if cookie already exists return the existing information

      else {

        // TODO reset cookie time in the visit queue

        return {
          pageVariant: getVisit(campaignID, cookie, targetURL),
          cookie: cookie,
          campaignID: campaignID
        }
      }

    },

    // Register variant conversion
    registerConversion: function(campaignID, targetURL, cookie, reward = 1) {

      var campaign = getCampaignByID(campaignID);
      var variantID = campaign.variants.indexOf(targetURL);
      var findCookie = function(visit) {
        return visit.cookie === cookie;
      }

      var cookiePosition = campaign.visitsQueue.map(function(e) {
        return e.cookie;
      }).indexOf(cookie);
      if (cookiePosition === -1) {
        return
      }
      var variant = campaign.variants.indexOf(targetURL);
      campaign.stats.update(variant, reward);

      campaign.visitsQueue.splice(cookiePosition, 1);
      return true;
    },

    updateExpiredVisits: updateExpiredVisits

  };
