import AdjacencyList from '../data-structures/AdjacencyList.js';

export const isEulerianCircuit = (graph, directed = true) => {
  for (const key of graph.nodes) {
    if (directed) {
      if (graph.indegree(key) !== graph.outdegree(key)) return false;
    } else {
      if (graph.degree(key) % 2 === 1) return false;
    }
  }

  return true;
};

export const isEulerianPath = (graph, directed = true) => {
  let oddDegree = 0;
  let outInDegree = 0;
  let inOutDegree = 0;

  if (directed) {
    for (const key of graph.nodes) {
      if (graph.outdegree(key) - graph.indegree(key) === 1) {
        outInDegree++;
      } else if (graph.indegree(key) - graph.outdegree(key) === 1) {
        inOutDegree++;
      } else if (graph.indegree(key) !== graph.outdegree(key)) {
        return false;
      }
    }
    return (outInDegree === 0 && inOutDegree === 0) || (outInDegree === 1 && inOutDegree === 1);
  }

  // Undirected
  for (const key of graph.nodes) {
    if (graph.degree(key) % 2 === 1) oddDegree++;
  }
  return [0, 2].includes(oddDegree);
};

const findStartNode = (graph) => {
  let start = 0;
  const nodes = graph.nodes;
  for (const key of nodes) {
    if (graph.outdegree(key) - graph.indegree(key) === 1) return key;
    if (graph.outdegree(key) > 0) start = key;
  }

  return start;
};

const dfs = (graph, node, path = []) => {
  while (graph.outdegree(node) !== 0) {
    const next = graph.list[node].pop();
    dfs(graph, next, path);
  }
  path.unshift(node);

  return path;
};

// Hierholzers algorithm
export const findEulerianPath = (graph) => {
  const directed = true;
  graph = new AdjacencyList(graph, directed);

  if (!isEulerianPath(graph, true)) return null;
  const edgeCount = graph.edgeCount;
  const startNode = findStartNode(graph);
  const path = dfs(graph, startNode);

  // Detect disconnected graphs
  if (path.length !== edgeCount + 1) return null;
  return path;
};
