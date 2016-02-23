

//UCB Test

var testEpsilonGreedy = new EpsilonGreedy(0.1, [], []);
//var testUCB1 = new UCB1([0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]);
//algo.initialize();
//console.log(algo.values);

var BernoulliArm = function(p){
  this.p = p;
  this.draw = function(){
    if (Math.random() > this.p) {
      return 0;
    } else {
      return 1;
    }

  };
};


var theArms = (function(){
  var means = [0.1, 0.1, 0.1, 0.1, 0.9];
  var nArms = means.length;
  var arms = [];
  for (var i = nArms - 1; i >= 0; i--) {
    arms[i] = new BernoulliArm(means[i]);
  }

  return arms;
}());


var simulate = function(algo, arms, numSims, horizon){

  _testLength = numSims * horizon;
  var _chosenArms = new Array(_testLength).fill(0);
  var _rewards = new Array(_testLength).fill(0);
  var _cumulitiveRewards = new Array(_testLength).fill(0);
  var _simNums = new Array(_testLength).fill(0);
  var _times = new Array(_testLength).fill(0);
  var _index = 0;
  for  (var _sim = numSims - 1; _sim >= 0; _sim--) {
    algo.initialize(arms);
    for (var _t = horizon - 1; _t >= 0; _t--) {

      _index = (_sim) * horizon + _t;

      _simNums[_index] = _sim;
      _times[_index] = _t;

      var _chosenArm = algo.selectArm();
      _chosenArms[_index] = _chosenArm;

       console.log("arms: " + arms);
       console.log("chose arms: " + _chosenArms);
      console.log("index: " + _index);
      var _reward = arms[_chosenArms[_index]].draw();


      console.log(_reward);
      _rewards[_index] = _reward;

      if (_t === 1) {
        _cumulitiveRewards[_index] = _reward;
      } else {
        _cumulitiveRewards[_index] = _cumulitiveRewards[_index - 1] + _reward;
      }

      algo.update(_chosenArm, _reward);
    }
  }
  return [{simNums:_simNums,times:_times, chosenArms:_chosenArms, rewards:_rewards, cumulitiveRewards:_cumulitiveRewards}];
};


var results = simulate(testEpsilonGreedy, theArms, 50, 5);
