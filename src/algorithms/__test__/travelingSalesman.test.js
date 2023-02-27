import { travelingSalesman } from '../../algorithms/travelingSalesman.js';

describe("Bellman Ford's algorithm ", () => {
  var matrix = [
    [0, 4, 2, 1, 3],
    [4, 0, 7, 3, 1],
    [2, 7, 0, 3, 0],
    [1, 3, 3, 0, 4],
    [3, 1, 0, 4, 0],
  ];

  it('should evaluate a path correctly', () => {
    expect(travelingSalesman(matrix)).toMatchObject([7, 10]);
  });
});
