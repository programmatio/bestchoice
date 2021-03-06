// UCB1 Algorithm Implementation
class UCB1 {

  constructor(counts, values){
    this.counts = counts;
    this.values = values;
    this.nArms;
  };

  initialize() {
    this.nArms = nArms;
    this.counts = new Array(this.nArms).fill(0);
    this.values = new Array(this.nArms).fill(0);
  };

  // Method to select the arm
  selectArm(){
    this.nArms = this.counts.length;

    for (var arm = 0;  arm < this.nArms; arm++) {
      if (this.counts[arm] === 0) {
      return arm;
    }

    var bonus = 0;
    var ucbValues = [];
    var totalCounts = sum(this.counts);

    for (var col = 1; col < this.nArms; col++){
      ucbValues.append(0.0);
      bonus = Math.sqrt(2 * Math.log(totalCounts));
      ucbValues[arm] = this.values[arm] + bonus;
    }

    return maxIndex(ucbValues);

    }
  };

  update(chosenArm, reward){
    var n = this.counts[chosenArm];
    var value = this.values[chosenArm];
    var newValue = ((n - 1) / n) * value + (1 / n) * reward;
    return this.values[chosenArm] = newValue;

  };
};

module.exports = UCB1;
