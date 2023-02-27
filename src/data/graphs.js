/**
 * Format used to represent graphs.
 *
 * @module graphs
 * @example
 *   const adjacencyListObject = {
 *     A: ['B'],
 *     B: ['C'],
 *     C: ['D'],
 *     D: ['A'],
 *   };
 *
 *   const adjacencyListWithWeightsObject = {
 *     A: ['B:1'],
 *     B: ['C:2'],
 *     C: ['D:3'],
 *     D: ['A:4'],
 *   };
 *
 *   const adjacencyMatrixWithWeightsObject = {
 *     A: [0, 2, 3, 4],
 *     B: [1, 0, 3, 4],
 *     C: [1, 2, 0, 4],
 *     D: [1, 2, 3, 0],
 *   };
 *
 *   const adjacencySetObject = ['A:B', 'B:C', 'C:D', 'D:A'];
 *
 *   const adjacencySetWithWeightsObject = ['A:B:1', 'B:C:2', 'C:D:3', 'D:A:'];
 */

/** My graph 1 */
export const adjacencyListObject = {
  A: ['B'],
  B: ['C'],
  C: ['D'],
  D: ['A'],
};

export const adjacencyListWithWeightsObject = {
  A: ['B:1'],
  B: ['C:2'],
  C: ['D:3'],
  D: ['A:3'],
};

export const adjacencyMatrixWithWeightsObject = {
  A: [0, 2, 3, 4],
  B: [1, 0, 3, 4],
  C: [1, 2, 0, 4],
  D: [1, 2, 3, 0],
};

export const adjacencySetObject = ['A:B', 'B:C', 'C:D', 'D:A'];

export const adjacencySetWithWeightsObject = ['A:B:1', 'B:C:2', 'C:D:3', 'D:A:4'];

export const binaryTreeObject = {
  // A: ['C', 'B'],
  // B: ['D', 'E'],
  // C: ['F', 'G'],
  // NUM
  // 0: ['2', '1'],
  // 1: ['4', '5'],
  // 2: ['6', '7'],
  // ORG
  0: [2, 1],
  1: [4, 5],
  2: [6, 7],
  4: [8],
  5: [9],
  8: [10, 11],
};
