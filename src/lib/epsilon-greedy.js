// Epsilon Greedy Algorithm Implementation
class EpsilonGreedy {
  constructor (epsilon, counts, values){
    this.epsilon = epsilon;
    this.counts = counts;
    this.values = values;
  };

  initialize(nArms) {
    this.nArms = nArms.length;
    // Set initial values to 0
    this.counts = new Array(this.nArms).fill(0);
    this.values = new Array(this.nArms).fill(0);
  };

  selectArm() {

    if (Math.random() > this.epsilon) {
      // Return index of the arm with greatest rewards
      console.log("Epsilon: ");
      return this.values.indexOf(Math.max(...this.values));

    } else {
      console.log("Random: ");
      return Math.ceil(Math.random()*this.values.length) - 1;

    }
  };

  update(chosenArm, reward) {

    this.counts[chosenArm]++;
    var n = this.counts[chosenArm];
    var value = this.values[chosenArm];
    var newValue =  ((n - 1) / n) * value + (1 / n) * reward;
    this.values[chosenArm] = newValue;
  };
}

module.exports = EpsilonGreedy;

