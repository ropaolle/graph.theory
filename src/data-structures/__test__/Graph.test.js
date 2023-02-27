import Graph from '../Graph.js';

describe('Graph', () => {
  const graph = new Graph();

  graph.addNode('A');
  graph.addNode('B', '1');
  graph.addNode('C', 1);
  graph.addNode('D');
  graph.addNode('E');
  graph.addNode('9');
  graph.addEdge('A', 'B');
  graph.addEdge('B', 'C', 12);
  graph.addEdge('B', 'B', '12');
  graph.addEdge('A', 'D');
  graph.addEdge('A', 'E');
  graph.addEdge('C', 'D');
  graph.addEdge('D', 'C');
  graph.addEdge('D', 'E');
  graph.addEdge('E', '9');

  it('should add nodes and edges correctly', () => {
    expect(graph.findNode('A')).toMatchObject({ key: 'A', value: 'A' });
    expect(graph.findNode('B')).toMatchObject({ key: 'B', value: '1' });
    expect(graph.findNode('C')).toMatchObject({ key: 'C', value: 1 });
    expect(graph.findNode('9')).toMatchObject({ key: '9', value: '9' });
    expect(graph.hasEdge('A', 'B')).toBe(true);
    expect(graph.hasEdge('B', 'C')).toBe(true);
    expect(graph.hasEdge('B', 'B')).toBe(true);
    expect(graph.hasEdge('D', 'B')).toBe(false);
  });

  it('should get and set edges correctly', () => {
    expect(graph.getEdgeWeight('A', 'B')).toBeUndefined();
    expect(graph.getEdgeWeight('B', 'C')).toBe(12);
    expect(graph.getEdgeWeight('B', 'B')).toBe('12');
    graph.setEdgeWeight('A', 'B', 'X');
    expect(graph.getEdgeWeight('A', 'B')).toBe('X');
    graph.setEdgeWeight('B', 'C', 'ZZZZ');
    expect(graph.getEdgeWeight('B', 'C')).toBe('ZZZZ');
  });

  it('should get adjacent correctly', () => {
    expect(graph.adjacent('A')).toMatchObject(['B', 'D', 'E']);
    expect(graph.adjacent('B')).toMatchObject(['C', 'B']);
    expect(graph.adjacent('C')).toMatchObject(['D']);
    expect(graph.adjacent('9')).toMatchObject([]);
  });

  it('should get indegree and outdegree correctly', () => {
    expect(graph.indegree('A')).toBe(0);
    expect(graph.indegree('B')).toBe(2);
    expect(graph.indegree('C')).toBe(2);
    expect(graph.indegree('D')).toBe(2);
    expect(graph.indegree('9')).toBe(1);
    expect(graph.outdegree('A')).toBe(3);
    expect(graph.outdegree('B')).toBe(2);
    expect(graph.outdegree('C')).toBe(1);
    expect(graph.outdegree('D')).toBe(2);
    expect(graph.outdegree('9')).toBe(0);
  });

  it('should delete node and edges correctly', () => {
    graph.removeEdge('B', 'B');
    expect(graph.getEdgeWeight('B', 'B')).toBeUndefined();
    graph.removeNode('C');
    expect(graph.findNode('C')).toBeUndefined();
    expect(graph.getEdgeWeight('C', 'D')).toBeUndefined();
    expect(graph.getEdgeWeight('D', 'C')).toBeUndefined();
  });

  it('should convert graph to a printalble sting correctly', () => {
    expect(graph.toString()).toMatchSnapshot();
  });

  it('should create and handle an undirected graph correctly', () => {
    const undirectedGraph = new Graph(false);
    undirectedGraph.addNode('A');
    undirectedGraph.addNode('B');
    undirectedGraph.addNode('C');
    undirectedGraph.addEdge('A', 'B');
    undirectedGraph.addEdge('A', 'C');
    undirectedGraph.setEdgeWeight('A', 'C', 666);
    undirectedGraph.removeEdge('C', 'A');
    undirectedGraph.removeNode('A');
  });
});
