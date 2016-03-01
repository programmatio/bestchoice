"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Epsilon Greedy Algorithm Implementation

var EpsilonGreedy = function () {
  function EpsilonGreedy(epsilon, counts, values) {
    _classCallCheck(this, EpsilonGreedy);

    this.epsilon = epsilon;
    this.counts = counts;
    this.values = values;
  }

  _createClass(EpsilonGreedy, [{
    key: "initialize",
    value: function initialize(nArms) {
      this.nArms = nArms;
      this.counts = new Array(this.nArms).fill(0);
      this.values = new Array(this.nArms).fill(0);
    }
  }, {
    key: "selectArm",
    value: function selectArm() {
      if (Math.random() > this.epsilon) {
        var _Math;

        // Return index of the arm with greatest rewards
        return this.values.indexOf((_Math = Math).max.apply(_Math, _toConsumableArray(this.values)));
      } else {
        return Math.floor(Math.random() * this.values.length);
      }
    }
  }, {
    key: "update",
    value: function update(chosenArm, reward) {
      this.counts[chosenArm]++;
      var n = this.counts[chosenArm];
      var value = this.values[chosenArm];
      var newValue = (n - 1) / n * value + 1 / n * reward;
      return this.values[chosenArm] = newValue;
    }
  }]);

  return EpsilonGreedy;
}();

module.exports = EpsilonGreedy;