import topologicalSort from '../topologicalSort.js';
import AdjacencyList from '../../data-structures/AdjacencyList.js';

describe('Topological sort', () => {
  it('should evaluate sort order of graphA correctly', () => {
    const graphA = {
      0: ['1', '3'],
      2: ['0', '4'],
      3: ['1'],
      4: ['3', '5'],
      5: ['1'],
    };
    const graph = AdjacencyList.toGraph(graphA);
    const order = ['2', '0', '4', '3', '5', '1'];
    expect(topologicalSort(graph)).toEqual(order);
  });

  it('should evaluate sort order of graphB correctly', () => {
    const graphB = {
      0: ['2', '3', '6'],
      1: ['4'],
      2: ['6'],
      3: ['1', '4'],
      4: ['5', '8'],
      6: ['7', '11'],
      7: ['4', '12'],
      9: ['2', '10'],
      10: ['6'],
      11: ['12'],
      12: ['8'],
      13: [],
    };
    const graph = AdjacencyList.toGraph(graphB);
    const order = ['0', '9', '13', '3', '2', '10', '1', '6', '7', '11', '4', '12', '5', '8'];
    expect(topologicalSort(graph)).toEqual(order);
  });

  it('should evaluate sort order of graphC correctly', () => {
    const graphC = {
      A: ['D'],
      B: ['D'],
      C: ['A', 'B'],
      D: ['G', 'H'],
      E: ['A', 'D', 'F'],
      F: ['J', 'K'],
      G: ['I'],
      H: ['I', 'J'],
      I: ['L'],
      J: ['M', 'L'],
      K: ['J'],
    };
    const graph = AdjacencyList.toGraph(graphC);
    const order = ['C', 'E', 'B', 'A', 'F', 'D', 'K', 'G', 'H', 'I', 'J', 'M', 'L'];
    expect(topologicalSort(graph)).toEqual(order);
  });

  it('should throw on error', () => {
    const graphD = {
      A: ['B'],
      B: ['A'],
    };
    const graph = AdjacencyList.toGraph(graphD);
    expect(() => {
      expect(topologicalSort(graph)).toEqual(1);
    }).toThrowError('The graph contains one or more cycles and that is not allowed.');
    graph.directed = false;
    expect(() => {
      expect(topologicalSort(graph)).toEqual(1);
    }).toThrowError('Topological sort is only supported on directed acyclic graphs (DAGs).');
  });
});
