import singleSourcePath from '../../algorithms/singleSourcePath.js';
import AdjacencyList from '../../data-structures/AdjacencyList.js';

describe('Single source path with topologicalSort', () => {
  it('should evaluate the single source path correctly', () => {
    const graphA = {
      A: ['B:3', 'C:6'],
      B: ['E:11', 'D:4', 'C:4'],
      C: ['D:8', 'G:11'],
      D: ['E:-4', 'F:5', 'G:2'],
      E: ['H:9'],
      F: ['H:1'],
      G: ['H:2'],
    };
    const graph = AdjacencyList.toGraph(graphA);
    expect(singleSourcePath(graph)).toEqual(11);
    expect(singleSourcePath(graph, false)).toEqual(23);
  });
});
