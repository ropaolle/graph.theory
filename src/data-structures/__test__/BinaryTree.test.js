import BinaryTree, { BinaryTreeNode } from '../BinaryTree.js';

describe('BinaryTree', () => {
  const bt = new BinaryTree('A');

  it('should insert nodes correctly', () => {
    expect(bt.insert('A', 'B')).toBe(true);
    expect(bt.insert('A', 'C')).toBe(true);
    expect(bt.insert('B', 'D')).toBe(true);
    expect(bt.insert('B', '5')).toBe(true);
    expect(bt.insert('C', 'F')).toBe(true);
    expect(bt.insert('C', 'G')).toBe(true);
    expect(bt.insert('5', 'H')).toBe(true);
    expect(bt.insert('G', 'J')).toBe(true);
    expect(bt.insert('G', 'K')).toBe(true);
    expect(bt.insert('X', 'X')).toBe(false);
    expect(bt.insert('5', 'X', 0, { left: false, right: false })).toBe(false);
  });

  it('should calculate the tree height correctly', () => {
    expect(bt.height()).toBe(3);
    expect(bt.height('F')).toBe(0);
    expect(bt.height('5')).toBe(1);
    expect(bt.height('X')).toBe(0);
    expect(bt.height(5)).toBe(0);
  });

  it('should traverse pre order correctly', () => {
    const result = [];
    for (const { key } of bt.preOrderTraversal()) {
      result.push(key);
    }
    expect(result.toString()).toBe('A,B,D,5,H,C,F,G,J,K');
  });

  it('should traverse in order correctly', () => {
    const result = [];
    for (const { key } of bt.inOrderTraversal()) {
      result.push(key);
    }
    expect(result.toString()).toBe('D,B,H,5,A,F,C,J,G,K');
  });

  it('should traverse post order correctly', () => {
    const result = [];
    for (const { key } of bt.postOrderTraversal()) {
      result.push(key);
    }
    expect(result.toString()).toBe('D,H,5,B,F,J,K,G,C,A');
  });

  it('should detect children and leaf', () => {
    expect(bt.root.hasChildren).toBe(true);
    expect(bt.find('H').hasChildren).toBe(false);
    expect(bt.find('G').isLeaf).toBe(false);
    expect(bt.find('K').isLeaf).toBe(true);
  });

  it('should get all leaves', () => {
    expect(bt.getLeaves().join('')).toBe('DHFJK');
  });

  it('should find node', () => {
    expect(bt.find('H').value).toBe('H');
    expect(bt.find('5').value).toBe('5');
    expect(bt.find(5)).toBeUndefined();
    expect(bt.remove('G')).toBe(true);
    expect(bt.find('G')).toBeUndefined();
    expect(bt.find('J')).toBeUndefined();
    expect(bt.find('K')).toBeUndefined();
    expect(bt.remove('H')).toBe(true);
    expect(bt.remove('X')).toBe(false);
  });

  it('should creat a BinaryTreeNode', () => {
    expect(new BinaryTreeNode('A')).toBeInstanceOf(BinaryTreeNode);
  });
});
