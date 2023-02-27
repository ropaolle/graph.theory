import fibonacci, { fibonacciNaive } from '../fibonacci';

describe('fibonacci', () => {
  it('should calculate fibonacci correctly', () => {
    expect(fibonacci(1)).toBe(1);
    expect(fibonacci(2)).toBe(1);
    expect(fibonacci(3)).toBe(2);
    expect(fibonacci(4)).toBe(3);
    expect(fibonacci(5)).toBe(5);
    expect(fibonacci(6)).toBe(8);
    expect(fibonacci(7)).toBe(13);
    expect(fibonacci(8)).toBe(21);
    expect(fibonacci(20)).toBe(6765);
    expect(fibonacci(30)).toBe(832040);
    expect(fibonacci(50)).toBe(12586269025);
    expect(fibonacci(70)).toBe(190392490709135);
    expect(fibonacci(75)).toBe(2111485077978050);
  });

  it('should calculate fibonacci without memo correctly', () => {
    expect(fibonacciNaive(1)).toBe(1);
    expect(fibonacciNaive(2)).toBe(1);
    expect(fibonacciNaive(3)).toBe(2);
    expect(fibonacciNaive(4)).toBe(3);
    expect(fibonacciNaive(5)).toBe(5);
    expect(fibonacciNaive(6)).toBe(8);
    expect(fibonacciNaive(7)).toBe(13);
    expect(fibonacciNaive(8)).toBe(21);
  });
});
