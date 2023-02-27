// https://github.com/Mekrache/Traveling-salesman-problem-exact-solution-javascript/blob/master/TSPexact.js

const combinations = (inputArr) => {
  var results = [];

  const permute = (arr, memo = []) => {
    let cur;

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }
    return results;
  };
  return permute(inputArr);
};

const initialize = (nbN) => {
  const t = new Array();

  for (var i = 1; i < nbN; i++) {
    t[i - 1] = i;
  }
  return combinations(t);
};

const calculateCosts = (comb, nbN, matrix_costs) => {
  const costs = new Array();

  for (var i = 0; i < comb.length; i++) {
    costs[i] = matrix_costs[0][comb[i][0]];

    for (var j = 1; j < nbN - 1; j++) {
      costs[i] += matrix_costs[comb[i][j - 1]][comb[i][j]];
    }
    costs[i] += matrix_costs[comb[i][nbN - 2]][0];
  }

  return costs;
};

const minCosts = (costs) => {
  let index = 0;
  let cost = costs[0];
  for (var i = 0; i < costs.length; i++) {
    if (costs[i] < cost) {
      cost = costs[i];
      index = i;
    }
  }

  return [cost, index];
};

export const travelingSalesman = (matrix) => {
  const nbNodes = 5;
  const comb = initialize(nbNodes);
  const costs = calculateCosts(comb, nbNodes, matrix);

  return minCosts(costs);
};
