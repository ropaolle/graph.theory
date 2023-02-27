/* eslint-disable curly */
export class BinaryTreeNode {
  constructor(key, value = key, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  get isLeaf() {
    return this.left === null && this.right === null;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

export default class BinaryTree {
  constructor(key, value = key) {
    this.root = new BinaryTreeNode(key, value);
  }

  *inOrderTraversal(node = this.root) {
    if (node.left) yield* this.inOrderTraversal(node.left);
    yield node;
    if (node.right) yield* this.inOrderTraversal(node.right);
  }

  *postOrderTraversal(node = this.root) {
    if (node.left) yield* this.postOrderTraversal(node.left);
    if (node.right) yield* this.postOrderTraversal(node.right);
    yield node;
  }

  *preOrderTraversal(node = this.root) {
    yield node;
    if (node.left) yield* this.preOrderTraversal(node.left);
    if (node.right) yield* this.preOrderTraversal(node.right);
  }

  insert(parentNodeKey, key, value = key, { left, right } = { left: true, right: true }) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        const canInsertLeft = left && node.left === null;
        const canInsertRight = right && node.right === null;
        // if (!canInsertLeft && !canInsertRight) return false;
        if (canInsertLeft) {
          node.left = new BinaryTreeNode(key, value, node);
          return true;
        }
        if (canInsertRight) {
          node.right = new BinaryTreeNode(key, value, node);
          return true;
        }
      }
    }
    return false;
  }

  remove(key) {
    for (let node of this.preOrderTraversal()) {
      if (node.left && node.left.key === key) {
        node.left = null;
        return true;
      }
      if (node.right && node.right.key === key) {
        node.right = null;
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

  height(key = this.root.key) {
    if (key === null) return -1;
    const node = this.find(key);
    if (!node || node.isLeaf) return 0;
    const leftHight = this.height(node.left && node.left.key);
    const rightHight = this.height(node.right && node.right.key);
    return Math.max(leftHight, rightHight) + 1;
  }

  getLeaves() {
    const leaves = [];
    for (const node of this.postOrderTraversal()) {
      if (node.isLeaf) leaves.push(node.key);
    }
    return leaves;
  }

  toString() {
    const bt = {};
    for (let { key, left, right } of this.preOrderTraversal()) {
      /* if (!bt[key]) */ bt[key] = [];
      if (left) bt[key].push(left.key);
      if (right) bt[key].push(right.key);
    }
    return bt;
  }

  /* istanbul ignore next */ print() {
    console.info(this.toString());
  }
}
