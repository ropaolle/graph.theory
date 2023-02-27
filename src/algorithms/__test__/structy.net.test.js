import {
  depthFirstTraverselRecursive,
  depthFirstTraverselIterative,
  breadthFirstTraverselIterative,
  hasPathBfsIterative,
  hasPathDfsRecursive,
  shortestPath,
  leafSum,
  isPrime,
} from '../structy.net.js';

const graphA = {
  f: ['g', 'i'],
  g: ['h'],
  h: [],
  i: ['g', 'k'],
  j: ['i'],
  k: [],
};

const graphB = {
  0: ['1', '9'],
  1: ['0', '8'],
  9: ['0', '8'],
  8: ['1', '9', '7'],
  7: ['8', '3', '6', '10', '11'],
  10: ['7', '11'],
  11: ['10', '7'],
  6: ['7', '5'],
  5: ['3', '6'],
  3: ['5', '7', '2', '3'],
  2: ['3'],
  4: ['3'],
  12: ['12'],
};

const graphC = {
  10: ['1', '9'],
  1: ['8', '10'],
  9: ['0', '8', '10'],
  12: ['2', '8'],
  8: ['1', '9', '12'],
  0: ['7', '9', '11'],
  2: ['3', '12'],
  3: ['2', '4', '7'],
  7: ['0', '3', '6', '11'],
  11: ['0', '7'],
  4: ['3'],
  5: ['6'],
  6: ['5', '7'],
};

const graphD = {
  0: ['1', '2', '3'],
  2: ['6'],
  3: ['8', '9', '-1'],
};

describe('Structy.net', () => {
  it('should travers graph with Depth First Traversel (DFS) correctly', () => {
    expect(depthFirstTraverselRecursive(graphA, 'f').join('')).toBe('fghighk');
    expect(depthFirstTraverselIterative(graphA, 'f').join('')).toBe('fikghgh');
  });

  it('should travers graph with Breadth First Traversel (BFS) correctly', () => {
    expect(breadthFirstTraverselIterative(graphA, 'f').join('')).toBe('fgihgkh');
  });

  it('should check if path exists', () => {
    expect(hasPathBfsIterative(graphA, 'f', 'h')).toBe(true);
    expect(hasPathBfsIterative(graphB, '0', '7')).toBe(true);
    expect(hasPathBfsIterative(graphB, '0', '3')).toBe(true);
    expect(hasPathBfsIterative(graphB, '0', '2')).toBe(true);
    expect(hasPathBfsIterative(graphB, '0', '12')).toBe(false);
    expect(hasPathBfsIterative(graphB, '0', '99')).toBe(false);
    expect(hasPathBfsIterative(graphB, '0', '4')).toBe(false);
    expect(hasPathDfsRecursive(graphA, 'f', 'h')).toBe(true);
    expect(hasPathDfsRecursive(graphB, '0', '7')).toBe(true);
    expect(hasPathDfsRecursive(graphB, '0', '3')).toBe(true);
    expect(hasPathDfsRecursive(graphB, '0', '2')).toBe(true);
    expect(hasPathDfsRecursive(graphB, '0', '99')).toBe(false);
  });

  it('should check if path exists', () => {
    expect(shortestPath(graphA, 'j', 'h').join(',')).toBe('j,i,g,h');
    expect(shortestPath(graphB, '0', '2').join(',')).toBe('0,1,8,7,3,2');
    expect(shortestPath(graphB, 0, 2).join(',')).toBe('0,1,8,7,3,2');
    expect(shortestPath(graphC, '2', '5').join(',')).toBe('2,3,7,6,5');
    expect(shortestPath(graphC, 2, 5).join(',')).toBe('2,3,7,6,5');
    expect(shortestPath(graphC, 0, 100).join(',')).toHaveLength(0);
  });

  it('should calculate the sum of all leaves', () => {
    expect(leafSum(graphD, '0')).toBe(23);
  });

  it('extras', () => {
    expect(isPrime(1)).toBe(false);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(104728)).toBe(false);
    expect(isPrime(104729)).toBe(true);
    expect(isPrime(919191919)).toBe(true);
    expect(isPrime(91919191919)).toBe(true);
    expect(isPrime(9191919191919)).toBe(false);
  });
});
