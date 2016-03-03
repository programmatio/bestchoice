'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EpsilonGreedy = require('./lib/epsilon-greedy.js');
var UCB1 = require('./lib/ucb1.js');

var campaigns = [];

var Campaign = function () {
  function Campaign(campaignID, baseURL, pathname, variants) {
    _classCallCheck(this, Campaign);

    this.campaignID = campaignID;
    this.baseURL = baseURL;
    this.pathname = pathname;
    this.variants = variants;
    this.stats = [];
    this.visits = [];
  }

  _createClass(Campaign, [{
    key: 'init',
    value: function init() {
      var counts = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var values = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      var len = this.variants.length;
      var counts = new Array(len).fill(0);
      var values = new Array(len).fill(0);
      this.stats = new EpsilonGreedy(0.1, counts, values);
      return true;
    }
  }]);

  return Campaign;
}();

;

// Get running campaign
var getCampaign = function getCampaign(campaignID) {
  var campaignID = campaignID;
  var findId = function findId(campaign) {
    return campaign.campaignID === campaignID;
  };
  return campaigns.find(findId);
};

var checkForExpiredVisits = function checkForExpiredVisits(campaignID) {
  var timeNow = new Date().getTime();

  var campaignIndex = campaigns.map(function (e) {
    return e.campaignID;
  }).indexOf(campaignID);

  var cleanList = campaigns[campaignIndex].visits.filter(function (e) {
    var minutesPassed = Math.round((timeNow - e.time) / 1000 / 60);

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
};

var findCookie = function findCookie(cookie) {
  var campaign = getCampaign(campaignID);
  var cookiePosition = campaign.visits.map(function (e) {
    return e.cookie;
  }).indexOf(cookie);
};

// Get unconverted visit
var getVisit = function getVisit(campaignID, cookie, variant) {
  var campaign = getCampaign(campaignID);
  var variantID = campaign.variants.indexOf(variant);
  var cookie = cookie;
  var findCookie = function findCookie(visit) {
    return visit.cookie === cookie;
  };

  return campaign.variants[campaign.stats.selectArm()];
};

// Register variant visit
var registerVisit = function registerVisit(campaignID, pathname, cookie) {
  var time = new Date().getTime();
  var campaignID = getCampaign(campaignID);
  var variant = campaignID.variants.indexOf(pathname);
  campaignID.visits.push({
    time: time,
    cookie: cookie,
    variant: variant
  });
  return cookie;
};

module.exports = {

  // Add page to the Campaign
  addCampaign: function addCampaign(campaignID, baseURL, pathname, variants) {
    var _campaignID = campaignID;
    campaigns.push(campaignID = new Campaign(campaignID, baseURL, pathname, variants));
    getCampaign(_campaignID).init();
    return true;
  },

  // Remove page from the Campaign
  removeCampaign: function removeCampaign(campaignID) {
    campaigns.splice(campaigns.indexOf(campaignID), 1);
    return true;
  },

  // Return all availible campaigns
  getCampaigns: function getCampaigns() {
    return campaigns;
  },

  // Return all availible campaigns as JSON
  saveCampaigns: function saveCampaigns() {
    return JSON.stringify(campaigns);
  },

  // Load campaigns from JSON file
  loadCampaigns: function loadCampaigns(data) {
    campaigns = JSON.parse(data);
    return true;
  },

  // Register visit
  visit: function visit(campaignID, pathname) {
    var cookie = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

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
      };
    } else {
      var cookie = cookie;

      return {
        pageVariant: getVisit(campaignID, cookie, variant),
        cookie: cookie
      };
    }
  },

  // Register variant conversion
  registerConversion: function registerConversion(campaignID, pathname, cookie) {
    var reward = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

    var campaign = getCampaign(campaignID);
    var variantID = campaign.variants.indexOf(pathname);
    var cookie = cookie;
    var findCookie = function findCookie(visit) {
      return visit.cookie === cookie;
    };

    var cookiePosition = campaign.visits.map(function (e) {
      return e.cookie;
    }).indexOf(cookie);
    if (cookiePosition === -1) {
      return registerVisit(campaignID, pathname, cookie);
    }
    var variant = campaign.variants.indexOf(pathname);
    campaign.stats.update(variant, reward);
    campaign.visits.splice(cookiePosition, 1);
    return true;
  }

};