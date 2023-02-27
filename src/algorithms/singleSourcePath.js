import topologicalSort from './topologicalSort';

/**
 * Single shortest or longest path based on typological sort order. The standard algorithm is the
 * shortes path but it can be changed to the longest path by negating all weights and then using
 * Math.abs on all result paths.
 */
export default function singleSourcePath(graph, shortestPath = true) {
  let order = topologicalSort(graph);

  const paths = {};
  for (const node of order) {
    paths[node] = Infinity;
  }

  paths[order[0]] = 0;

  for (const node of order) {
    const neighbors = graph.adjacent(node);
    for (const neighbor of neighbors) {
      /* istanbul ignore next */
      if (!paths[neighbor]) continue;
      const weight = shortestPath
        ? graph.getEdgeWeight(node, neighbor)
        : -graph.getEdgeWeight(node, neighbor);
      paths[neighbor] = Math.min(paths[neighbor], paths[node] + weight);
    }
  }

  if (!shortestPath) order.forEach((v) => (paths[v] = Math.abs(paths[v])));

  return paths[order.pop()];
}
