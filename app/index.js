'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EpsilonGreedy = require('./lib/epsilon-greedy.js');
var UCB1 = require('./lib/ucb1.js');

var campaigns = [];

var Campaign = function () {
  function Campaign(id, baseURL, target, variants) {
    _classCallCheck(this, Campaign);

    this.id = id;
    this.baseURL = baseURL;
    this.target = target;
    this.variants = variants;
    this.stats = [];
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

module.exports = {

  // Add page to the Campaign
  addCampaign: function addCampaign(id, baseURL, target, variants) {
    campaigns.push(id = new Campaign(id, baseURL, target, variants).init());
  },

  // Get page from the Campaign
  getCampaign: function getCampaign(id) {
    var _id = id;
    var findId = function findId(campaign) {
      return campaign.id === _id;
    };
    return campaigns.find(findId);
  },

  // Remove page from the Campaign
  removeCampaign: function removeCampaign(id) {

    var _id = id;
    var findId = function findId(campaign) {
      return campaign.id === _id;
    };
    campaigns.splice(campaigns.indexOf(campaigns.find(findId)), 1);
    return true;
  },

  // Return all availible campaigns
  getCampaigns: function getCampaigns() {
    return campaigns;
  },

  // Load campaigns from JSON file
  loadCampaigns: function loadCampaigns(data) {
    campaigns = JSON.parse(data);
  }

};