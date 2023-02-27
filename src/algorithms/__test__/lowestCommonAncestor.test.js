import Tree from '../../data-structures/Tree.js';
import lowestCommonAncestor from '../lowestCommonAncestor.js';

describe('Tree lowest common ancestor (LCA)', () => {
  const bt = new Tree('A');
  bt.insert('A', 'B');
  bt.insert('A', 'C');
  bt.insert('B', 'D');
  bt.insert('D', 'E');
  bt.insert('D', 'F');
  bt.insert('E', 'G');

  it('should find lowest common ancestor correctly', () => {
    expect(lowestCommonAncestor(bt, ['F', 'G'])).toBe('D');
    expect(lowestCommonAncestor(bt, ['C', 'F'])).toBe('A');
    expect(lowestCommonAncestor(bt, ['B', 'B'])).toBe('B');
    expect(lowestCommonAncestor(bt, ['A', 'B', 'E'])).toBe('A');
    expect(lowestCommonAncestor(bt, ['X', 'B'])).toBeUndefined();
    expect(lowestCommonAncestor(bt, ['B', ''])).toBeUndefined();
    expect(lowestCommonAncestor({ root: null }, [])).toBe();
  });
});
