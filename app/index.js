'use strict';

var EpsilonGreedy = require('./lib/epsilon-greedy.js');
var UCB1 = require('./lib/ucb1.js');

//Test

module.exports = {
  // Add page to the group
  addPage: function addPage(page, group) {
    return true;
  },
  // Remove page from the group
  removePage: function removePage(page, group) {
    return true;
  }
};