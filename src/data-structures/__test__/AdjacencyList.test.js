import AdjacencyList from '../AdjacencyList.js';

describe('AdjacencyList', () => {
  const listObject = {
    0: ['2', '1'],
    1: ['4', '5'],
    2: ['6', '7'],
    4: ['8'],
    5: ['9'],
    8: ['10', '11'],
  };

  const listWithWeightsObject = {
    A: ['B:1'],
    B: ['C:2'],
    C: ['D:3'],
    D: ['A:3'],
  };

  it('should calculate the tree height correctly', () => {
    const al = new AdjacencyList(listObject);
    expect(al.nodeCount).toBe(11);
    const al2 = new AdjacencyList(listWithWeightsObject);
    expect(al2.nodeCount).toBe(4);
  });

  it('should import list object correctly', () => {
    const al = new AdjacencyList(listObject);
    expect(al.list).toMatchSnapshot();
    expect(AdjacencyList.fromList(listObject)).toMatchSnapshot();
    expect(AdjacencyList.fromList(listWithWeightsObject)).toMatchSnapshot();
  });

  it('should import matrix object correctly', () => {
    const matrixWithWeightsObject = {
      A: [0, 2, 3, 4],
      B: [1, 0, 3, 4],
      C: [1, 2, 0, 4],
      D: [1, 2, 3, 0],
    };
    const al = new AdjacencyList(matrixWithWeightsObject, 'adjacencyMatrix');
    expect(al.list).toMatchSnapshot();
    expect(AdjacencyList.fromMatrix(matrixWithWeightsObject)).toMatchSnapshot();
    const matrixWithWeightsObject2 = {
      A: [0, Infinity, 3, 4],
      B: [1, 0, 3, Infinity],
    };
    expect(AdjacencyList.fromMatrix(matrixWithWeightsObject2)).toMatchSnapshot();
  });

  it('should import set object correctly', () => {
    const setObject = ['A:B', 'B:C', 'C:D', 'D:A', 'D:E'];
    const al = new AdjacencyList(setObject, 'adjacencySet');
    expect(al.list).toMatchSnapshot();
    expect(AdjacencyList.fromSet(setObject)).toMatchSnapshot();
    const setWithWeightsObject = ['A:B:1', 'B:C:2', 'C:D:3', 'D:A:4'];
    const al2 = new AdjacencyList(setWithWeightsObject, 'adjacencySet');
    expect(al2.list).toMatchSnapshot();
    expect(AdjacencyList.fromSet(setWithWeightsObject)).toMatchSnapshot();
  });

  it('should create a Graph object correctly', () => {
    const graph = { A: ['B', 'C', 'D'], B: [1] };
    expect(() => {
      expect(AdjacencyList.toGraph(graph));
    }).toThrowError('Edge keys must be of type String!');
    graph['B'] = 'D';
    expect(AdjacencyList.toGraph(graph)).toMatchSnapshot();
  });

  it('should create a Tree object correctly', () => {
    const graphObject = {
      0: ['1', '2', '5'],
      2: ['3'],
      5: ['4', '6'],
      4: ['9'],
    };
    const tree = AdjacencyList.toTree(graphObject, '0');
    expect(tree.encodeTree()).toBe('(((())())(())())');
    expect(() => {
      AdjacencyList.toTree({ 0: ['0'] }, '0');
    }).toThrowError('Edges with the same node as the source and target are not allowed (loop).');
    expect(() => {
      AdjacencyList.toTree({ 0: ['1'], 1: ['0'] }, '0');
    }).toThrowError('Undirected edges is not allowed (loop to parent).');
    expect(() => {
      AdjacencyList.toTree({ 0: [1], 1: [0] }, '0');
    }).toThrowError('Edge keys must be of type String!');
  });

  it('should create a BinaryTree object correctly', () => {
    const graphObject = {
      0: ['2', '1'],
      1: ['4', '5'],
      2: ['6', '7'],
      4: ['8'],
      5: ['9'],
      8: ['10', '11'],
    };
    const binaryTree = AdjacencyList.toBinaryTree(graphObject, '0');
    expect(binaryTree.toString()).toMatchSnapshot();
    expect(() => {
      AdjacencyList.toBinaryTree({ 0: ['1', '2', '3'] }, '0');
    }).toThrowError('Nodes with more than two children is not allowed in a binary tree.');
  });

  it('should stringify object correctly', () => {
    const al = new AdjacencyList({
      A: ['B:1'],
      B: ['C:2'],
      C: ['D:3'],
      D: ['A:3'],
    });
    const al2 = new AdjacencyList({
      A: ['B'],
      B: ['C'],
      C: ['D'],
      D: ['A'],
    });
    expect(al.toString()).toMatchSnapshot();
    expect(al.toString('', false)).toMatchSnapshot();
    expect(al.toString('graphviz')).toMatchSnapshot();
    expect(al2.toString('graphviz', false)).toMatchSnapshot();
    expect(al.toString('mermaid')).toMatchSnapshot();
    expect(al2.toString('mermaid', false)).toMatchSnapshot();
    expect(al.toString('d3')).toMatchSnapshot();
    expect(al2.toString('d3', false)).toMatchSnapshot();
  });
});
