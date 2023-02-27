import { dijkstra, dijkstraShortestPath } from '../dijkstraShortestPath.js';
import AdjacencyList from '../../data-structures/AdjacencyList.js';

describe("Dijkstra's algorithm", () => {
  const graphA = AdjacencyList.toGraph({
    0: ['1:4', '2:1'],
    1: ['3:1'],
    2: ['1:2', '3:5'],
    3: ['4:3'],
  });

  const graphB = AdjacencyList.toGraph({
    A: ['B:5', 'C:1'],
    B: ['C:2', 'D:3', 'E:20'],
    C: ['B:3', 'E:12'],
    D: ['C:3', 'E:2', 'F:6'],
    E: ['F:1'],
    G: ['A:1'],
  });

  it('should evaluate all paths correctly', () => {
    const result = [
      { 0: 0, 1: 3, 2: 1, 3: 4, 4: 7 },
      { 0: null, 1: '2', 2: '0', 3: '1', 4: '3' },
    ];
    expect(dijkstra(graphA, '0', '4')).toMatchObject(result);
    expect(dijkstra(graphA, '0', '4', true)).toMatchObject(result);
    expect(dijkstra(graphA, '0', '4', false)).toMatchObject(result);
    const result2 = [
      { A: 0, B: 4, C: 1, D: 7, E: 9, F: 10 },
      { A: null, B: 'C', C: 'A', D: 'B', E: 'D', F: 'E' },
    ];
    expect(dijkstra(graphB, 'A', 'F')).toMatchObject(result2);
  });

  it('should evaluate the shortest path correctly', () => {
    expect(dijkstraShortestPath(graphA, '0', '4')).toMatchObject({
      length: 7,
      path: ['0', '2', '1', '3', '4'],
    });
    expect(dijkstraShortestPath(graphB, 'A', 'F')).toMatchObject({
      length: 10,
      path: ['A', 'C', 'B', 'D', 'E', 'F'],
    });
    expect(dijkstraShortestPath(graphB, 'A', 'G')).toHaveLength(0);
    expect(() => {
      expect(dijkstraShortestPath(graphA, '0', '99'));
    }).toThrowError("Dijkstra's algorithm requires an existing node start and end id.");
  });
});
