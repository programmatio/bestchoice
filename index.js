function sum(arr) {

  var result = 0, n = arr.length || 0;

  while(n--) {
    result += +arr[n]; // unary operator
  }

  return result;

}

// Get Max Index

function maxIndex(numArray) {
  var maxNum = Math.max.apply(null, numArray);
  return numArray.indexOf(maxNum);

}

// UCB1 Algorithm Implementation

var UCB1 = function(counts, values){

  this.counts = counts;

  this.values = values;

}

UCB1.prototype.initialize = function(nArms) {

  for (var col in nArms){
    this.counts.append(0);
  }

  for (var col in nArms){
    this.values.append(0.0);
  }

};

// Method to select the arm

UCB1.prototype.selectArm = function(){

  var nArms = this.counts.length;

  for (var arm = nArms - 1; arm >= 0; arm--) {
    if (this.counts[arm] === 0) {
    return arm
  };

  var ucbValues = [];

  for (var col in nArms){
    ucbValues.append(0.0);
  }

  var totalCounts = sum(this.counts);

  for (var arm = nArms - 1; arm >= 0; arm--) {
    var bonus = Math.sqrt(2 * Math.log(totalCounts));
    ucbValues[arm] = this.values[arm] + bonus;
  };

  return maxIndex(ucbValues);

  };
};

UCB1.prototype.update = function(chosenArm, reward){
  var n = this.counts[chosenArm];
  console.log(n);

  var value = this.values[chosenArm]
  var newValue = ((n - 1) / n) * value + (1 / n) * reward;

  console.log(newValue);

  this.values[chosenArm] = newValue;
  return

};


module.exports = {
  // Add page to the group
  addPage: function(page, group) {
    return true;
  },
  // Remove page from the group
  removePage: function(page, group) {
    return true;
  }
};


