/**
 * Topological sort does not have to be unique. To check that a particular graph has a unique
 * topological sorting, it is apparently enough to check for a Hamiltonian path in the DAG. Quoting
 * wikipedia: If a topological sort has the property that all pairs of consecutive vertices in the
 * sorted order are connected by edges, then these edges form a directed Hamiltonian path in the
 * DAG. If a Hamiltonian path exists, the topological sort order is unique; no other order respects
 * the edges of the path. Conversely, if a topological sort does not form a Hamiltonian path, the
 * DAG will have two or more valid topological orderings, for in this case it is always possible to
 * form a second valid ordering by swapping two consecutive vertices that are not connected by an
 * edge to each other. Therefore, it is possible to test in linear time whether a unique ordering
 * exists.
 *
 * TODO: Check if the order is unique? - So you just need to get the DAG for the first sorting you
 * find and check that it forms a path that visits all the vertices.
 */
import AdjacencyList from '../data-structures/AdjacencyList.js';

// Topological sort with Kahn's algorithm
export default function topologicalSort(graph) {
  if (!graph.directed)
    throw new Error('Topological sort is only supported on directed acyclic graphs (DAGs).');

  // TODO: Remove dependency on AdjacencyList
  const nodes = AdjacencyList.graphToAdjacencyList(graph, false);
  const nodeCount = Object.keys(nodes).length;
  const queue = [];
  const order = [];

  const indegree = {};
  for (const [node, neighbors] of Object.entries(nodes)) {
    if (!indegree[node]) indegree[node] = 0;
    for (const neighbor of neighbors) {
      if (!indegree[neighbor]) indegree[neighbor] = 0;
      indegree[neighbor]++;
    }
  }

  for (const node in nodes) {
    if (indegree[node] === 0) queue.push(node);
  }

  let steps = 0;
  while (queue.length) {
    const node = queue.shift();
    order.push(String(node));
    steps++;
    const neighbors = nodes[node];
    for (const neighbor of neighbors) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  if (steps !== nodeCount)
    throw new Error('The graph contains one or more cycles and that is not allowed.');

  return order;
}
