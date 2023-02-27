class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

export default class PriorityQueue {
  constructor() {
    this.items = [];
  }

  get isEmpty() {
    return this.items.length === 0;
  }

  get size() {
    return this.items.length;
  }

  enqueue(val, priority) {
    var element = new Node(val, priority);
    var contain = false;
    // Iterating through items and add elements at the correct location of the Queue.
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > element.priority) {
        // Once the correct location is found it is enqueued.
        this.items.splice(i, 0, element);
        contain = true;
        break;
      }
    }

    // Highest priority element is added to queue.
    if (!contain) this.items.push(element);
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  rear() {
    return this.items[this.items.length - 1];
  }

  toString(includePriority = false) {
    let items = [];
    for (const { val, priority } of this.items)
      items.push(includePriority ? `${val}:${priority}` : val);

    return items.join(' -> ');
  }

  /* istanbul ignore next */ print() {
    console.info(this.toString());
  }
}
