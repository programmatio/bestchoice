let EpsilonGreedy = require('./lib/epsilon-greedy.js');
let UCB1 = require('./lib/ucb1.js');

module.exports = {

  // Add page to the group
  addPage: function(page, group, type) {
    return true;
  },

  // Remove page from the group
  removePage: function(page, group, type) {
    return true;
  },

  addGroup: function(name){
    return true;
  },

};
