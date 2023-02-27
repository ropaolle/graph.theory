import PriorityQueue from '../data-structures/PriorityQueue.js';
import AdjacencyList from '../data-structures/AdjacencyList.js';

// Do not support negative cycles.
export const dijkstra = (graph, start, end, lazy = true) => {
  // TODO: Remove dependency on AdjacencyList
  const nodes = AdjacencyList.graphToAdjacencyList(graph);
  const visited = {};
  const distance = {};
  const previous = {};
  for (const [node] of Object.entries(nodes)) {
    visited[node] = false;
    distance[node] = Infinity;
    previous[node] = null;
  }
  distance[start] = 0;

  const queue = new PriorityQueue();
  queue.enqueue(start, 0);

  while (!queue.isEmpty) {
    const current = queue.dequeue();
    visited[current.val] = true;
    // Ignore that do not have a shorter path
    if (distance[current.val] < current.priority) continue;
    for (const [val, priority] of nodes[current.val]) {
      if (visited[val]) continue;
      const newDist = distance[current.val] + priority;
      if (newDist < distance[val]) {
        previous[val] = current.val;
        distance[val] = newDist;
        // This PriorityQueue implementation cannot update existing elements and we might get duplicates in the queue. The algorithm still works but the queue size may grow for non sparse graphs.
        queue.enqueue(val, newDist);
      }
    }
    // Lazy mode will exit as soon as we have processed the end node. Instead of of processing all nodes (eager mode).
    if (lazy && current.val === end) return [distance, previous];
  }

  return [distance, previous];
};

export const dijkstraShortestPath = (graph, start, end) => {
  if (!graph.findNode(start) || !graph.findNode(end))
    throw new Error("Dijkstra's algorithm requires an existing node start and end id.");

  const [distance, previous] = dijkstra(graph, start, end);

  // Reconstruct path
  const path = [];
  if (distance[end] === Infinity) return path;
  for (let node = end; node !== null; node = previous[node]) {
    path.push(node);
  }
  path.reverse();
  return { path, length: distance[end] };
};
