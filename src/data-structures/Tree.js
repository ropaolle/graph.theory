/* eslint-disable curly */
// https://www.30secondsofcode.org/articles/s/js-data-structures-tree

export class TreeNode {
  constructor(key, value = key, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = [];
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

export default class Tree {
  constructor(key, value = key) {
    this.root = new TreeNode(key, value);
  }

  *preOrderTraversal(node = this.root) {
    yield node;
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  *postOrderTraversal(node = this.root) {
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  /**
   * Euler tour is defined as a way of traversing a tree such that each vertex is added to the tour
   * when we visit it (either moving down from the parent vertex or returning from the child
   * vertex). We start from the root and reach back to the source after visiting all vertices.
   *
   * It requires precisely 2*N-1 vertices to store Euler tour.
   *
   * @param node Start tree node
   * @param depth Only used locally. TODO: Wrap in inner function!
   */
  *eulerianTour(node = this.root, depth = 0) {
    if (node === null) return;
    yield { node: node.key, depth };
    for (const child of node.children) {
      yield* this.eulerianTour(child, depth + 1);
      yield { node: node.key, depth };
    }
  }

  insert(parentNodeKey, key, value = key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        node.children.push(new TreeNode(key, value, node));
        return true;
      }
    }
    return false;
  }

  remove(key) {
    for (let node of this.preOrderTraversal()) {
      const filtered = node.children.filter((c) => c.key !== key);
      if (filtered.length !== node.children.length) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  find(key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }

  height(key = this.root.key, level = 0, height = 0) {
    height = Math.max(height, level);
    const node = this.find(key);
    if (!node || node.isLeaf) return height;
    for (const child of node.children) {
      height = this.height(child.key, level + 1, height);
    }
    return height;
  }

  getLeaves() {
    const leaves = [];
    for (const node of this.postOrderTraversal()) {
      if (node.isLeaf) leaves.push(node.key);
    }
    return leaves;
  }

  isUniquelyIndexed() {
    const keys = new Set();
    for (const { key } of this.postOrderTraversal()) {
      if (keys.has(key)) return false;
      keys.add(key);
    }
    return true;
  }

  encodeTree(key = this.root.key) {
    const node = this.find(key);
    if (!node) return;
    if (!this.isUniquelyIndexed()) throw new Error('Only graphs with unique keys can be encoded.');
    // Collect labels and sort
    const labels = [];
    for (const child of node.children) {
      labels.push(this.encodeTree(child.key));
    }
    labels.sort();
    return `(${labels.reduce((result, code) => result + code, '')})`;
  }

  toString() {
    const bt = {};
    for (let { key, children } of this.preOrderTraversal()) {
      // Use a set to ignore duplicates
      if (!bt[key]) bt[key] = new Set();
      for (const child of children) {
        bt[key].add(child.key);
      }
    }
    // Convert from set to array
    for (const [node, childSet] of Object.entries(bt)) {
      bt[node] = Array.from(childSet);
    }
    return bt;
  }

  /* istanbul ignore next */ print() {
    console.info(this.toString());
  }
}
