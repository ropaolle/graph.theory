import shortestPathInGrid from '../shortestPathInGrid.js';

describe('Shortest path in grid', () => {
  it('should evaluate the single source path correctly', () => {
    const dungeon = [
      ['.', '.', '.', '#', '.', '.', '.'],
      ['.', '#', '.', '.', '.', '#', '.'],
      ['.', '#', '.', '.', '.', '.', '.'],
      ['.', '.', '#', '#', '.', '.', '#'],
      ['#', '.', '#', '.', '.', '#', '.'],
    ];

    expect(shortestPathInGrid(dungeon, [0, 0], [4, 3])).toMatchSnapshot();
    expect(shortestPathInGrid(dungeon, [0, 0], [4, 3]).length).toBe(9);
    expect(shortestPathInGrid(dungeon, [0, 0], [4, 6])).toBe(false);
    expect(shortestPathInGrid(dungeon, [0, 0], [4, 7])).toBe(false);
  });
});
