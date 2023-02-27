export const bellmanFordSSSP = (graph, start) => {
  const edgeCount = graph.edges.size;
  const distance = {};
  for (const { key } of graph.nodes) {
    distance[key] = Infinity;
  }
  distance[start] = 0;

  // Update distances with shortest paths
  for (let i = 0; i < edgeCount - 1; i++) {
    for (const [, { a, b, weight }] of graph.edges) {
      if (distance[a] + weight < distance[b]) {
        distance[b] = distance[a] + weight;
      }
    }
  }

  // Loop to find nodes in negative cycles
  for (let i = 0; i < edgeCount - 1; i++) {
    for (const [, { a, b, weight }] of graph.edges) {
      if (distance[a] + weight < distance[b]) {
        distance[b] = -Infinity;
      }
    }
  }

  return distance;
};

/**
 * Retrieving the shortest path between two nodes. It has worse time complexity than Dijkstra's but
 * can handle negative cycles.
 *
 * @param {Graph} graph A Graph object
 * @param {string} start Key name of start node.
 * @param {string} end Key neame of end node.
 * @returns {number | undefined} Number: a valid distance, Infinity: node does not exist, -Infinity:
 *   node cannot be reached, undefined: node part of a negative cycle.
 */
export const bellmanFordShortestPath = (graph, start, end) => {
  const distance = bellmanFordSSSP(graph, start);
  return distance[end];
};
