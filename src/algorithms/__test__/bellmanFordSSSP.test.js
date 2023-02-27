import { bellmanFordSSSP, bellmanFordShortestPath } from '../../algorithms/bellmanFordSSSP.js';
import AdjacencyList from '../../data-structures/AdjacencyList.js';

describe("Bellman Ford's algorithm ", () => {
  const graphA = AdjacencyList.toGraph({
    A: ['B:4', 'G:2'],
    B: ['B:-1', 'C:3]'],
    C: ['D:3', 'E:1'],
    D: ['F:-2'],
    E: ['F:2'],
    // F: [],
    G: ['E:2'],
  });

  const graphB = AdjacencyList.toGraph({
    0: ['1:5'],
    1: ['2:20', '5:30', '6:60'],
    2: ['3:10', '4:75'],
    3: ['2:-15'],
    4: ['9:100'],
    5: ['6:5', '8:50', '4:25'],
    6: ['7:-50'],
    7: ['8:-10'],
  });

  it('should evaluate all paths correctly', () => {
    const resultA = { A: 0, B: -Infinity, C: Infinity, D: Infinity, E: 4, F: 6, G: 2 };
    expect(bellmanFordSSSP(graphA, 'A')).toMatchObject(resultA);
    const resultB = {
      0: 0,
      1: 5,
      2: -Infinity,
      3: -Infinity,
      4: -Infinity,
      5: 35,
      6: 40,
      7: -10,
      8: -20,
      9: -Infinity,
    };
    expect(bellmanFordSSSP(graphB, '0')).toMatchObject(resultB);
  });

  it('should evaluate a path correctly', () => {
    expect(bellmanFordShortestPath(graphA, 'A', 'F')).toBe(6);
    expect(bellmanFordShortestPath(graphA, 'A', 'B')).toBe(-Infinity);
    expect(bellmanFordShortestPath(graphA, 'A', 'C')).toBe(Infinity);
    expect(bellmanFordShortestPath(graphA, 'A', 'X')).toBeUndefined();
    expect(bellmanFordShortestPath(graphB, '0', '5')).toBe(35);
    expect(bellmanFordShortestPath(graphB, '0', '8')).toBe(-20);
    expect(bellmanFordShortestPath(graphB, '0', '9')).toBe(-Infinity);
  });
});
