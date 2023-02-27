const visitedArray = (graph, fill = false) =>
  Array(graph.length)
    .fill()
    .map(() => Array(graph[0].length).fill(fill));

const dr = [-1, 1, 0, 0];
const dc = [0, 0, 1, -1];

const getNeighbours = (grid, row, col, visited) => {
  let neighbours = [];

  for (let i = 0; i < 4; i++) {
    const r = row + dr[i];
    const c = col + dc[i];

    // Out of bounds
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length) {
      continue;
    }

    // Visited or blocked
    if (visited[r][c] || grid[r][c] === '#') {
      continue;
    }

    neighbours.push([r, c]);
  }

  return neighbours;
};

const reconstructShortestPath = (prev, [sr, sc], [er, ec]) => {
  const start = `${sr}:${sc}`;
  const end = `${er}:${ec}`;
  let path = [end];
  let node = end;

  while (node && node !== start) {
    node = prev[node];
    path.unshift(node);
  }

  // Path do not exist or cannot be reached, exit.
  if (node !== start) return [];

  return path.map((cords) => cords.split(':').map(Number));
};

/**
 * Iterative breadth first traversal to find shortest path in grid.
 *
 * @example
 *   shortestPathInGrid(grid, [0, 0], [4, 3]); // [ [ 0, 0 ], [ 0, 1 ] ... [ 4, 3 ] ]
 *
 * @param {Array} grid - 2D array representing the grid.
 * @param {Array} start - Start cordinates [row, col].
 * @param {Array} end - End cordinates [row, col].
 * @returns {Array} All steps in the shortes path, from start and end. The number of steps is
 *   <code>path.length - 1</code>.
 */

export default function shortestPathInGrid(grid, [startRow, startCol], [endRow, endCol]) {
  const rq = [startRow];
  const cq = [startCol];

  const visited = visitedArray(grid);
  visited[startRow][startCol] = true;
  let reachedEnd;
  let prev = [];

  while (rq.length > 0) {
    const r = rq.shift();
    const c = cq.shift();

    if (r === endRow && c === endCol) {
      reachedEnd = true;
      break;
    }

    const neighbours = getNeighbours(grid, r, c, visited);
    for (const [nr, nc] of neighbours) {
      rq.push(nr);
      cq.push(nc);
      visited[nr][nc] = true;
      prev[`${nr}:${nc}`] = `${r}:${c}`;
    }
  }

  const path = reconstructShortestPath(prev, [startRow, startCol], [endRow, endCol]);

  return reachedEnd ? { path, length: path.length - 1 } : false;
}

// TODO: Create a generic matrix class.
/* const print = (grid, path) => {
  if (path) {
    for (let i = 1; i < path.length - 1; i++) {
      grid[path[i][0]][path[i][1]] = 'O';
    }
  }

  for (const row of grid) {
    console.info(row.join(' '));
  }
  console.info();
}; */
