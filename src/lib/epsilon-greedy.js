// Epsilon Greedy Algorithm Implementation
class EpsilonGreedy {
  constructor (epsilon, counts, values){
    this.epsilon = epsilon;
    this.counts = counts;
    this.values = values;
  }

  initialize(nArms) {
    this.nArms = nArms;
    this.counts = new Array(this.nArms).fill(0);
    this.values = new Array(this.nArms).fill(0);
  }

  selectArm(){
    if (Math.random() > this.epsilon) {
      // Return index of the arm with greatest rewards
      return this.values.indexOf(Math.max(...this.values));
    } else {
      return Math.floor(Math.random()*this.values.length);
    }
  }

  update(chosenArm, reward) {
    this.counts[chosenArm]++;
    var n = this.counts[chosenArm];
    var value = this.values[chosenArm];
    var newValue =  ((n - 1) / n) * value + (1 / n) * reward;
    this.values[chosenArm] = newValue;
  }
}

module.exports = EpsilonGreedy;

