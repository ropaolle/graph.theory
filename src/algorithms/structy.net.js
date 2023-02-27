export const depthFirstTraverselIterative = (graph, source) => {
  const stack = [source];
  const path = [];
  while (stack.length > 0) {
    const current = stack.pop();
    path.push(current);
    for (const neighbor of graph[current]) {
      stack.push(neighbor);
    }
  }
  return path;
};

export const depthFirstTraverselRecursive = (graph, source, path = []) => {
  path.push(source);
  for (const neighbor of graph[source]) {
    path.push(...depthFirstTraverselRecursive(graph, neighbor));
  }
  return path;
};

export const breadthFirstTraverselIterative = (graph, source) => {
  const stack = [source];
  const path = [];
  while (stack.length > 0) {
    const current = stack.shift();
    path.push(current);
    for (const neighbor of graph[current]) {
      stack.push(neighbor);
    }
  }
  return path;
};

/**
 * Breadth first traversal (recursive, not implementd)<p> BFT traditionally uses a queue, not a
 * stack. The nature of a queue and a stack are pretty much opposite, so trying to use the call
 * stack (which is a stack, hence the name) as the auxiliary storage (a queue) is pretty much doomed
 * to failure, unless you're doing something stupidly ridiculous with the call stack that you
 * shouldn't be.
 */
// export const breadthFirstTraverselRecursive = (graph, source) => {};

export const hasPathDfsRecursive = (graph, src, dst, visited = []) => {
  if (src === dst) return true;
  if (visited[src]) return;
  visited[src] = true;
  for (const neighbor of graph[src]) {
    const hit = hasPathDfsRecursive(graph, neighbor, dst, visited);
    if (hit === true) return true;
  }
  return false;
};

export const hasPathBfsIterative = (graph, src, dst) => {
  const stack = [src];
  const visited = [];
  while (stack.length > 0) {
    const current = stack.shift();
    if (!visited[current]) {
      visited[current] = true;
      for (const neighbor of graph[current]) {
        if (neighbor === dst) return true;
        stack.push(neighbor);
      }
    }
  }
  return false;
};

const reconstructShortestPath = (start, end, prev) => {
  const path = [end];
  let node = end;
  while (node && node !== start) {
    node = prev[node];
    path.unshift(node);
  }
  return node === start ? path : [];
};

const shortestPathBfsIterative = (graph, start) => {
  const stack = [start];
  const visited = {};
  const prev = [];
  while (stack.length > 0) {
    const current = stack.shift();
    for (const neighbor of graph[current]) {
      if (visited[neighbor]) continue;
      stack.push(neighbor);
      visited[neighbor] = true;
      prev[neighbor] = current;
    }
  }
  return prev;
};

export const shortestPath = (graph, start, end) => {
  const prev = shortestPathBfsIterative(graph, String(start));
  return reconstructShortestPath(String(start), String(end), prev);
};

export const leafSum = (tree, startNode, sum = 0) => {
  let localSum = 0;
  if (!tree[startNode] || tree[startNode].length === 0) {
    return Number(startNode);
  }
  for (const neighbor of tree[startNode]) {
    localSum += leafSum(tree, neighbor);
  }
  return sum + localSum;
};

export const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};
