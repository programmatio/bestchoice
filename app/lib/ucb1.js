"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// UCB1 Algorithm Implementation

var UCB1 = function () {
  function UCB1(counts, values) {
    _classCallCheck(this, UCB1);

    this.counts = counts;
    this.values = values;
  }

  _createClass(UCB1, [{
    key: "initialize",
    value: function initialize() {
      this.counts = Array(this.nArms).fill(0);
      this.values = Array(this.nArms).fill(0);
    }
  }, {
    key: "selectArm",


    // Method to select the arm
    value: function selectArm() {
      this.nArms = this.counts.length;

      for (var arm = 0; arm < this.nArms; arm++) {
        if (this.counts[arm] === 0) {
          return arm;
        }

        var bonus = 0;
        var ucbValues = [];
        var totalCounts = sum(this.counts);

        for (var col = 1; col < this.nArms; col++) {
          ucbValues.append(0.0);
          bonus = Math.sqrt(2 * Math.log(totalCounts));
          ucbValues[arm] = this.values[arm] + bonus;
        }

        return maxIndex(ucbValues);
      }
    }
  }, {
    key: "update",
    value: function update(chosenArm, reward) {
      var n = this.counts[chosenArm];
      var value = this.values[chosenArm];
      var newValue = (n - 1) / n * value + 1 / n * reward;
      this.values[chosenArm] = newValue;
      return;
    }
  }]);

  return UCB1;
}();

module.exports = UCB1;