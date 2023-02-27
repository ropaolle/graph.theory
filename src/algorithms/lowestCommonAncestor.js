/* eslint-disable curly */
// eslint-disable-next-line func-style
function* eulerianTour(node, depth = 0) {
  if (node === null) return;
  yield { node, depth };
  for (const child of node.children) {
    yield* eulerianTour(child, depth + 1);
    yield { node, depth };
  }
}

const minIndex = (depths, left, right) => {
  let indexOfMin = Infinity;
  let index = Infinity;
  for (let i = left; i <= right; i++) {
    if (depths[i] < indexOfMin) {
      index = i;
      indexOfMin = depths[i];
    }
  }
  return index;
};

const lca = (nodes, depths, left, right) => {
  const nodeIdx = minIndex(depths, Math.min(left, right), Math.max(left, right));
  return nodes[nodeIdx].key;
};

export default function lowestCommonAncestor(tree, nodeList) {
  for (const node of nodeList) {
    if (!tree.find(node)) return;
  }

  // Setup
  const nodes = [];
  const depths = [];
  const last = [];
  let tourIndex = 0;
  for (const { node, depth } of eulerianTour(tree.root)) {
    nodes[tourIndex] = node;
    depths[tourIndex] = depth;
    last[node.key] = tourIndex;
    tourIndex++;
  }

  if (nodes.length === 0) return;

  // Get lca for the first two nodes and then recursively call lca for the result and the next node.
  const [n1, n2, ...rest] = nodeList;
  let prevLca = lca(nodes, depths, last[n1], last[n2]);
  for (const node of rest) {
    prevLca = lca(nodes, depths, last[prevLca], last[node]);
  }

  return prevLca;
}
