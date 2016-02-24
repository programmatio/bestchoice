'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EpsilonGreedy = require('../lib/epsilon-greedy.js');
var UCB1 = require('../lib/ucb1.js');

var testEpsilonGreedy = new EpsilonGreedy(0.1, [], []);

var BernoulliArm = function () {
  function BernoulliArm(p) {
    _classCallCheck(this, BernoulliArm);

    this.p = p;
  }

  _createClass(BernoulliArm, [{
    key: 'draw',
    value: function draw() {
      if (Math.random() > this.p) {
        return 0;
      } else {
        return 1;
      }
    }
  }]);

  return BernoulliArm;
}();

;

var theArms = function () {
  var means = [0.1, 0.1, 0.1, 0.1, 0.9];
  var nArms = means.length;
  var arms = [];
  for (var i = nArms - 1; i >= 0; i--) {
    arms[i] = new BernoulliArm(means[i]);
  }
  return arms;
}();

var simulate = function simulate(algo, arms, numSims, horizon) {
  var testLength = numSims * horizon;
  var chosenArms = new Array(testLength).fill(0);
  var rewards = new Array(testLength).fill(0);
  var cumulitiveRewards = new Array(testLength).fill(0);
  var simNums = new Array(testLength).fill(0);
  var times = new Array(testLength).fill(0);
  var index = 0;
  for (var sim = numSims - 1; sim >= 0; sim--) {
    algo.initialize(arms);
    for (var t = horizon - 1; t >= 0; t--) {

      index = sim * horizon + t;

      simNums[index] = sim;
      times[index] = t;

      var chosenArm = algo.selectArm();
      chosenArms[index] = chosenArm;

      console.log("arms: " + arms);
      console.log("chose arms: " + chosenArms);
      console.log("index: " + index);
      var reward = arms[chosenArms[index]].draw();

      console.log(reward);
      rewards[index] = reward;

      if (t === 1) {
        cumulitiveRewards[index] = reward;
      } else {
        cumulitiveRewards[index] = cumulitiveRewards[index - 1] + reward;
      }

      algo.update(chosenArm, reward);
    }
  }
  return [{ simNums: simNums, times: times, chosenArms: chosenArms, rewards: rewards, cumulitiveRewards: cumulitiveRewards }];
};

var results = simulate(testEpsilonGreedy, theArms.length, 50, 5);