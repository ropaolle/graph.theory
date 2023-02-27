import Tree, { TreeNode } from '../Tree.js';

describe('TreeNode', () => {
  it('should create new TreeNode correctly', () => {
    const tn = new TreeNode('NewTreeNode');
    expect(tn.isLeaf).toBe(true);
    expect(tn.hasChildren).toBe(false);
  });
});

describe('Tree', () => {
  const bt = new Tree('A');
  it('should insert nodes correctly', () => {
    expect(bt.insert('A', 'B')).toBe(true);
    expect(bt.insert('A', 'C')).toBe(true);
    expect(bt.insert('A', '3')).toBe(true);
    expect(bt.insert('C', 'D')).toBe(true);
    expect(bt.insert('D', 'E')).toBe(true);
    expect(bt.insert('3', 'G')).toBe(true);
    expect(bt.insert('3', 'H')).toBe(true);
    expect(bt.insert('3', 'I')).toBe(true);
    expect(bt.insert('X', 'I')).toBe(false);
    expect(bt.insert('Z')).toBe(false);
  });

  it('should calculate the tree height correctly', () => {
    expect(bt.height()).toBe(3);
    expect(bt.height('C')).toBe(2);
    expect(bt.height('H')).toBe(0);
    expect(bt.height('3')).toBe(1);
    expect(bt.height(3)).toBe(0);
    expect(bt.height('X')).toBe(0);
  });

  it('should traverse pre order correctly', () => {
    const result = [];
    for (const { key } of bt.preOrderTraversal()) {
      result.push(key);
    }
    expect(result.toString()).toBe('A,B,C,D,E,3,G,H,I');
  });

  it('should traverse post order correctly', () => {
    const result = [];
    for (const { key } of bt.postOrderTraversal()) {
      result.push(key);
    }
    expect(result.toString()).toBe('B,E,D,C,G,H,I,3,A');
  });

  it('should complete an eulerian tour correctly', () => {
    const result = [];
    for (const { node, depth } of bt.eulerianTour()) {
      result.push(node, depth);
    }
    expect(result.toString()).toBe(
      'A,0,B,1,A,0,C,1,D,2,E,3,D,2,C,1,A,0,3,1,G,2,3,1,H,2,3,1,I,2,3,1,A,0'
    );
    expect(bt.eulerianTour(null).next()).toMatchObject({ done: true, value: undefined });
  });

  it('should get all leaves', () => {
    expect(bt.getLeaves().join('')).toBe('BEGHI');
  });

  it('should test isLeave and hasChildren', () => {
    expect(bt.root.isLeaf).toBe(false);
    expect(bt.root.hasChildren).toBe(true);
  });

  it('to encode tree correctly', () => {
    expect(bt.encodeTree()).toBe('(((()))(()()())())');
    expect(bt.encodeTree('3')).toBe('(()()())');
    expect(bt.encodeTree('X')).toBeUndefined();
  });

  it('should find node', () => {
    expect(bt.find('A').value).toBe('A');
    expect(bt.find('E').value).toBe('E');
    expect(bt.find('3').value).toBe('3');
    expect(bt.find(3)).toBeUndefined();
    expect(bt.remove('E')).toBe(true);
    expect(bt.remove('Z')).toBe(false);
    expect(bt.find('E')).toBeUndefined();
    expect(bt.find('X')).toBeUndefined();
  });

  it('is uniquly indexted', () => {
    expect(bt.isUniquelyIndexed()).toBe(true);
    expect(bt.insert('3', 'I')).toBe(true);
    expect(bt.isUniquelyIndexed()).toBe(false);
    expect(() => {
      bt.encodeTree();
    }).toThrowError('Only graphs with unique keys can be encoded.');
  });

  it('should stringify the Tree', () => {
    const str =
      '{"3":["G","H","I"],"A":["B","C","3"],"B":[],"C":["D"],"D":[],"G":[],"H":[],"I":[]}';
    expect(JSON.stringify(bt.toString())).toBe(str);
  });
});
