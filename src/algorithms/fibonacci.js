export const fibonacciNaive = (n) => {
  if (n <= 2) return 1;

  return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
};

export default function fibonacci(n, mem = []) {
  if (mem[n]) return mem[n];
  if (n <= 1) return n;
  mem[n] = fibonacci(n - 1, mem) + fibonacci(n - 2, mem);

  return mem[n];
}
