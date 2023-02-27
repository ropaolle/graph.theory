import PriorityQueue from '../PriorityQueue.js';

describe('BinaryTree (number)', () => {
  const pq = new PriorityQueue();

  it('should enqueue items correctly', () => {
    pq.enqueue('A', 1);
    pq.enqueue('B', 2);
    pq.enqueue('C', 3);
    pq.enqueue('1', 10);
    pq.enqueue('2', 10);
    pq.enqueue('3', 10);
    pq.enqueue('X', 5);
    pq.enqueue('Y', 5);
    pq.enqueue('Z', 5);
  });

  it('should access front and rear item correctly', () => {
    expect(pq.front().val).toBe('A');
    expect(pq.rear().val).toBe('3');
  });

  it('render toString correctly', () => {
    expect(pq.toString()).toMatchSnapshot();
    expect(pq.toString(true)).toMatchSnapshot();
  });

  it('should dequeue items correctly', () => {
    expect(pq.dequeue()).toMatchObject({ priority: 1, val: 'A' });
    expect(pq.dequeue()).toMatchObject({ priority: 2, val: 'B' });
    expect(pq.isEmpty).toBe(false);
    expect(pq.size).toBe(7);
    pq.dequeue();
    pq.dequeue();
    pq.dequeue();
    pq.dequeue();
    pq.dequeue();
    pq.dequeue();
    pq.dequeue();
    expect(pq.isEmpty).toBe(true);
    expect(pq.dequeue()).toBeUndefined();
  });
});
