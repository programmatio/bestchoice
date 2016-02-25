'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EpsilonGreedy = require('../lib/epsilon-greedy.js');
var UCB1 = require('../lib/ucb1.js');

var testEpsilonGreedy = function testEpsilonGreedy() {

  function mode(array) {
    if (array.length == 0) return null;
    var modeMap = {};
    var maxEl = array[0],
        maxCount = 1;
    for (var i = 0; i < array.length; i++) {
      var el = array[i];
      if (modeMap[el] == null) modeMap[el] = 1;else modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  }

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

  var theArms = function theArms() {
    var means = [0.1, 0.8, 0.9, 0.1, 0.1];
    var nArms = means.length;
    var arms = [];
    for (var i = 0; i < means.length; i++) {
      arms[i] = new BernoulliArm(means[i]);
    }
    return arms;
  };

  var simulate = function simulate(algo, arms, numSims, horizon) {

    var testLength = numSims * horizon;
    var chosenArms = new Array(testLength).fill(0);
    var rewards = new Array(testLength).fill(0);
    var cumulitiveRewards = new Array(testLength).fill(0);
    var simNums = new Array(testLength).fill(0);
    var times = new Array(testLength).fill(0);
    var index = 1;
    algo.initialize(arms.length);
    for (var sim = 1; sim < testLength + 1; sim++) {

      for (var t = 1; t < horizon + 1; t++) {

        index = (sim - 1) * horizon + t - 1;

        simNums[index] = sim;
        times[index] = t;

        var chosenArm = algo.selectArm();
        chosenArms[index] = chosenArm;
        var reward = arms[chosenArms[index]].draw();
        rewards[index] = reward;

        if (t === 1) {
          cumulitiveRewards[index] = reward;
        } else {
          cumulitiveRewards[index] = cumulitiveRewards[index - 1] + reward;
        }

        algo.update(chosenArm, reward);
      }
    }

    return { simNums: simNums, times: times, chosenArms: chosenArms, rewards: rewards, cumulitiveRewards: cumulitiveRewards };
  };

  var results = simulate(testEpsilonGreedy, theArms(), 200, 10);
  results.simNums.length == 20000;
  mode(results.chosenArms) === 2;
};

describe('Multi Armed Bandit Test', function () {
  describe('results.simNums', function () {
    it('adds the page and returns true', function () {
      testEpsilonGreedy();
    });
  });
});