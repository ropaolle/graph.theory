export default function getTreeCenters(graph) {
  if (graph.directed) throw new Error('getTreeCenters only supports undirected trees.');

  const length = graph.nodes.length;
  const degree = Array(length).fill(0);
  let leaves = [];

  for (let nodeIdx = 0; nodeIdx < length; nodeIdx++) {
    const key = graph.nodes[nodeIdx].key;
    const childCount = graph.adjacent(key).length;
    degree[nodeIdx] = childCount;
    if (childCount === 0 || childCount === 1) {
      leaves.push(nodeIdx);
      degree[nodeIdx] = 0;
    }
  }
  let count = leaves.length;

  while (count < length) {
    const newLeaves = [];
    for (const nodeIdx of leaves) {
      const key = graph.nodes[nodeIdx].key;
      const children = graph.adjacent(key);
      for (const neighbor of children) {
        const neighborIdx = graph.nodes.findIndex(({ key }) => key === neighbor);
        degree[neighborIdx] = degree[neighborIdx] - 1;
        if (degree[neighborIdx] === 1) newLeaves.push(neighborIdx);
      }
      degree[nodeIdx] = 0;
    }
    count += newLeaves.length;
    leaves = newLeaves;
  }

  return leaves.map((nodeIdx) => graph.nodes[nodeIdx].key);
}
