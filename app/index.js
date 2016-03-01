'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EpsilonGreedy = require('./lib/epsilon-greedy.js');
var UCB1 = require('./lib/ucb1.js');

var campaigns = [];
var visits = [];

var Campaign = function () {
  function Campaign(id, baseURL, target, variants) {
    _classCallCheck(this, Campaign);

    this.id = id;
    this.baseURL = baseURL;
    this.target = target;
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
var getCampaign = function getCampaign(id) {
  var _id = id;
  var findId = function findId(campaign) {
    return campaign.id === _id;
  };
  return campaigns.find(findId);
};

// Get unconverted visit
var getVisit = function getVisit(id, cookie) {
  var _id = getCampaign(id);
  var _cookie = cookie;
  var findCookie = function findCookie(visit) {
    return visit.cookie === _cookie;
  };
  var _timeNow = new Date().getTime();
  var _visit = _id.visits.find(findCookie);
  console.log(_visit);

  var _minutesPassed = Math.round((_timeNow - _visit.time) / 1000 / 60);

  console.log(_minutesPassed < 60);
  if (_minutesPassed < 60) {
    _id.visits.indexOf(_id.visits.find(findCookie));
  };

  //splice(campaigns.indexOf(id),1);
  return console.log();
};

// Register variant visit
var registerVisit = function registerVisit(id, variant, cookie) {
  var time = new Date().getTime();
  var id = getCampaign(id);
  var variant = id.variants.indexOf(variant);
  id.visits.push({ time: time, cookie: cookie, variant: variant });
  return cookie;
};

module.exports = {

  // Add page to the Campaign
  addCampaign: function addCampaign(id, baseURL, target, variants) {
    var _id = id;
    campaigns.push(id = new Campaign(id, baseURL, target, variants));
    getCampaign(_id).init();
  },

  // Remove page from the Campaign
  removeCampaign: function removeCampaign(id) {
    campaigns.splice(campaigns.indexOf(id), 1);
    return true;
  },

  // Return all availible campaigns
  getCampaigns: function getCampaigns() {
    return campaigns;
  },

  // Load campaigns from JSON file
  loadCampaigns: function loadCampaigns(data) {
    campaigns = JSON.parse(data);
  },

  // Register visit
  visit: function visit(id, variant) {
    var cookie = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

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
  registerConversion: function registerConversion(id, variant, cookie) {
    var reward = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

    var id = getCampaign(id);
    var variant = id.variants.indexOf(variant);
    id.stats.update(variant, reward);
    return true;
  }

};