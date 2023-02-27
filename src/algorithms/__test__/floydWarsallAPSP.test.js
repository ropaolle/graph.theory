import floydWarsall from '../floydWarsallAPSP';

describe('Floyd Warsall APSP', () => {
  const matrix = [
    [0, 2, 5, Infinity, Infinity, Infinity, 10],
    [Infinity, 0, 2, Infinity, 11, Infinity, Infinity],
    [Infinity, Infinity, 0, Infinity, Infinity, Infinity, 2],
    [Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity],
    [Infinity, Infinity, Infinity, Infinity, 0, 1, Infinity],
    [Infinity, Infinity, Infinity, Infinity, -2, 0, Infinity],
    [Infinity, Infinity, Infinity, Infinity, Infinity, 11, 0],
  ];

  it('should evaluate all paths correctly', () => {
    expect(() => {
      expect(floydWarsall(matrix, 0, 7));
    }).toThrowError('Start or end node does not exist!');
    expect(() => {
      expect(floydWarsall(matrix, 7, 0));
    }).toThrowError('Start or end node does not exist!');

    expect(floydWarsall(matrix, 0, 2)).toMatchObject([4, [0, 1, 2]]);
    expect(floydWarsall(matrix, 1, 5)).toBe('Negative cycle, path cannot be reached!');
    expect(floydWarsall(matrix, 2, 0)).toBe('Path do not exists!');
    expect(floydWarsall(matrix, 0, 6)).toMatchObject([6, [0, 1, 2, 6]]);
    expect(floydWarsall(matrix, 2, 4)).toBe('Negative cycle, path cannot be reached!');
    expect(floydWarsall(matrix, 2, 5)).toBe('Negative cycle, path cannot be reached!');
    expect(floydWarsall(matrix, 2, 6)).toMatchObject([2, [2, 6]]);
    expect(floydWarsall(matrix, 4, 5)).toBe('Negative cycle, path cannot be reached!');
    expect(floydWarsall(matrix, 4, 6)).toBe('Path do not exists!');
  });
});
