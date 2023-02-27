import AdjacencyList from '../../data-structures/AdjacencyList.js';
import { findEulerianPath, isEulerianCircuit, isEulerianPath } from '../findEulerianPath.js';

describe('Find Eulerian path', () => {
  const graphA = {
    0: [],
    1: ['2', '3'],
    2: ['2', '4', '4'],
    3: ['1', '2', '5'],
    4: ['3', '6'],
    5: ['6'],
    6: ['3'],
  };

  const graphB = {
    0: ['1'],
    1: ['2', '3'],
    2: ['1'],
    3: ['4'],
    4: [],
  };

  const graphC = {
    0: ['1'],
    1: ['2', '4', '3'],
    2: ['1'],
    4: ['1'],
  };

  const graphD = {
    0: ['1'],
    1: ['2'],
    2: ['3'],
    3: ['0'],
  };

  const graphE = {
    0: ['1'],
    1: ['2'],
    2: ['0'],
    8: ['9'],
  };

  const graphF = {
    0: ['1'],
    2: ['1'],
  };

  it('should evaluate all paths correctly', () => {
    const path = ['1', '3', '5', '6', '3', '2', '4', '3', '1', '2', '2', '4', '6'];
    expect(findEulerianPath(graphA)).toMatchObject(path);
    expect(findEulerianPath(graphB)).toMatchObject(['0', '1', '2', '1', '3', '4']);
    expect(findEulerianPath(graphC)).toMatchObject(['0', '1', '4', '1', '2', '1', '3']);
    expect(findEulerianPath(graphD)).toMatchObject(['3', '0', '1', '2', '3']);
    expect(findEulerianPath(graphE)).toBeNull();
    expect(findEulerianPath(graphF)).toBeNull();
  });
});

describe('Does Eulerian circuit or path exists', () => {
  it('should detect Eulerian circuits and paths on undirected graphs', () => {
    const undirectedNoPathNoCircuit = {
      0: ['1', '3', '4'],
      1: ['0', '2'],
      2: ['1', '3', '4'],
      3: ['0', '2', '4'],
      4: ['0', '2', '3'],
    };

    const undirectedPathOnly = {
      0: ['1', '2'],
      1: ['0', '2', '3', '4'],
      2: ['0', '1', '3', '4'],
      3: ['1', '2', '4'],
      4: ['1', '2', '3'],
    };

    const undirectedPathAndCircuit = {
      0: ['1', '1', '4', '5'],
      1: ['0', '0', '2', '2'],
      2: ['1', '1', '3', '4'],
      3: ['2', '4'],
      4: ['2', '3', '5', '6'],
      5: ['4', '6'],
    };

    let directed = false;
    const al = (graph) => new AdjacencyList(graph, directed);

    expect(isEulerianCircuit(al(undirectedNoPathNoCircuit), directed)).toBe(false);
    expect(isEulerianCircuit(al(undirectedPathOnly), directed)).toBe(false);
    expect(isEulerianCircuit(al(undirectedPathAndCircuit), directed)).toBe(true);
    expect(isEulerianPath(al(undirectedNoPathNoCircuit), directed)).toBe(false);
    expect(isEulerianPath(al(undirectedPathOnly), directed)).toBe(true);
    expect(isEulerianPath(al(undirectedPathAndCircuit), directed)).toBe(true);
  });

  it('should detect Eulerian circuits and paths on directed graphs', () => {
    const directedPathAndCircuit = {
      0: ['1', '1'],
      1: ['2', '3'],
      2: ['0'],
      3: ['0'],
    };

    const directedNoPathNoCircuit = {
      0: ['1'],
      1: ['2'],
      2: [],
      3: ['0', '2'],
    };

    // Unique start (4) and end (1) node
    const directedPathOnly = {
      0: ['1'],
      1: ['1', '4', '5'],
      2: ['1'],
      3: [],
      4: ['2', '4', '5'],
      5: ['0', '1'],
    };

    const directed = true;
    const al = (graph) => new AdjacencyList(graph, directed);

    expect(isEulerianCircuit(al(directedPathAndCircuit))).toBe(true);
    expect(isEulerianCircuit(al(directedNoPathNoCircuit), directed)).toBe(false);
    expect(isEulerianCircuit(al(directedPathOnly), directed)).toBe(false);
    expect(isEulerianPath(al(directedPathAndCircuit))).toBe(true);
    expect(isEulerianPath(al(directedNoPathNoCircuit), directed)).toBe(false);
    expect(isEulerianPath(al(directedPathOnly), directed)).toBe(true);
  });
});
