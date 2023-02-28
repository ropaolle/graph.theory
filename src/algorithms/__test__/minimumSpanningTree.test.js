// import PriorityQueue from '../../data-structures/PriorityQueue.js';
import AdjacencyList from '../../data-structures/AdjacencyList.js';
import minimumSpanningTree from '../minimumSpanningTree.js';

describe("Prim's minimum spanning tree algorithm", () => {
  const graphA = {
    0: ['1:10', '2:1', '3:4'],
    1: ['0:10', '2:3', '4:0'],
    2: ['0:1', '1:3', '3:2', '5:8'],
    3: ['0:4', '2:2', '5:2', '6:7'],
    4: ['1:0', '5:1', '7:8'],
    5: ['2:8', '3:2', '4:1', '6:6', '7:9'],
    6: ['3:7', '5:6', '7:12'],
    7: ['4:8', '5:9', '6:12'],
  };

  const graphB = {
    0: ['1:0'],
    1: [],
    2: ['1:0'],
  };

  it('should evaluate path and cost correctly', () => {
    const result = [20, ['0:2', '2:3', '3:5', '5:4', '4:1', '5:6', '4:7']];
    expect(minimumSpanningTree(new AdjacencyList(graphA), '0')).toMatchObject(result);
    expect(minimumSpanningTree(new AdjacencyList(graphB), '0')).toBe(null);
  });
});
