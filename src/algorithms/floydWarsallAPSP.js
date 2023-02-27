const floydWarsallAPSP = (matrix) => {
  // SETUP
  const matrixSize = matrix.length;
  const memoTable = [];
  const next = [];
  for (let i = 0; i < matrix.length; i++) {
    memoTable[i] = [];
    next[i] = [];
    for (let j = 0; j < matrix[0].length; j++) {
      memoTable[i][j] = matrix[i][j];
      if (memoTable[i][j] !== Infinity) next[i][j] = j;
    }
  }

  // Execute
  for (let k = 0; k < matrixSize; k++) {
    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        if (memoTable[i][k] + memoTable[k][j] < memoTable[i][j]) {
          memoTable[i][j] = memoTable[i][k] + memoTable[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }

  // Handle negative cycles
  for (let k = 0; k < matrixSize; k++) {
    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        if (memoTable[i][k] + memoTable[k][j] < memoTable[i][j]) {
          memoTable[i][j] = -Infinity;
          next[i][j] = -1;
        }
      }
    }
  }

  return [memoTable, next];
};

const reconstructPath = (memoTable, next, start, end) => {
  const path = [];

  // Path do not exist!
  if (memoTable[start][end] === Infinity) return Infinity;

  for (; start !== end; start = next[start][end]) {
    // Negative cycle!
    if (start === -1) return -Infinity;
    path.push(start);
  }
  // Negative cycle!
  // TODO: Does this occure?
  if (next[start][end] === -1) return -Infinity;
  path.push(end);

  return path;
};

export default function floydWarsall(matrix, start, end) {
  if (matrix[start] === undefined || matrix[start][end] === undefined)
    throw new Error('Start or end node does not exist!');

  const [memoTable, next] = floydWarsallAPSP(matrix);

  const length = memoTable[start][end];
  const path = reconstructPath(memoTable, next, start, end);

  switch (path) {
    case Infinity:
      return 'Path do not exists!';
    case -Infinity:
      return 'Negative cycle, path cannot be reached!';
  }

  return [length, path];
}
