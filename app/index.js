'use strict';

var EpsilonGreedy = require('./lib/epsilon-greedy.js');
var UCB1 = require('./lib/ucb1.js');

module.exports = {

  // Add page to the group
  addPage: function addPage(page, group, type) {
    return true;
  },

  // Remove page from the group
  removePage: function removePage(page, group, type) {
    return true;
  },

  addGroup: function addGroup(name) {
    return true;
  }

};