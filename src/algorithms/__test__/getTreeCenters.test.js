import getTreeCenters from '../getTreeCenters.js';
import AdjacencyList from '../../data-structures/AdjacencyList.js';

describe('getTreeCenters', () => {
  it('should throw on directed trees', () => {
    const graph = AdjacencyList.toGraph({});
    expect(() => {
      expect(getTreeCenters(graph, '0', '0'));
    }).toThrowError('getTreeCenters only supports undirected trees.');
  });

  it('should get tree centers of GraphA', () => {
    const graphA = {
      0: ['1'],
      1: ['3', '4'],
      3: ['2', '6', '7'],
      4: ['8', '5'],
      6: ['9'],
    };
    const graph = AdjacencyList.toGraph(graphA, false);
    expect(getTreeCenters(graph)).toEqual(['1', '3']);
  });

  it('should get tree centers of GraphB', () => {
    const graphB = {
      A: ['B'],
      B: ['D', 'E'],
      D: ['C', 'G', 'H'],
      E: ['I', 'F'],
      G: ['J'],
    };
    const graph = AdjacencyList.toGraph(graphB, false);
    expect(getTreeCenters(graph)).toEqual(['B', 'D']);
  });
});
