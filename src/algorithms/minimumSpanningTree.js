import PriorityQueue from '../data-structures/PriorityQueue.js';

const addEdges = (startNode, visited, graph, pq) => {
  visited[startNode] = true;
  let neighbours = graph.list[startNode];
  for (const [node, weight] of neighbours) {
    if (!visited[node]) {
      pq.enqueue({ from: startNode, to: node }, weight);
    }
  }
};

// Prim's minimum spanning tree algorithm
export default function minimumSpanningTree(graph, startNode) {
  const pq = new PriorityQueue();
  const edgesInMST = graph.nodeCount - 1;
  let edgeCount = 0;
  let mstCost = 0;
  const mstEdges = [];
  const visited = [];
  addEdges(startNode, visited, graph, pq);

  while (pq.size > 0 && edgeCount !== edgesInMST) {
    const { val, priority } = pq.dequeue();
    if (visited[val.to]) continue;
    mstEdges[edgeCount++] = `${val.from}:${val.to}`;
    mstCost += priority;
    addEdges(val.to, visited, graph, pq);
  }

  // No MST exists!
  if (edgeCount !== edgesInMST) return null;

  return [mstCost, mstEdges];
}
