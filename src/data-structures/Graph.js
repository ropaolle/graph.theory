export default class Graph {
  constructor(directed = true) {
    this.directed = directed;
    this.nodes = [];
    this.edges = new Map();
  }

  addNode(key, value = key) {
    this.nodes.push({ key, value });
  }

  addEdge(a, b, weight) {
    this.edges.set(JSON.stringify([a, b]), { a, b, weight });
    if (!this.directed) this.edges.set(JSON.stringify([b, a]), { a: b, b: a, weight });
  }

  removeNode(key) {
    this.nodes = this.nodes.filter((n) => n.key !== key);
    [...this.edges.values()].forEach(({ a, b }) => {
      if (a === key || b === key) this.edges.delete(JSON.stringify([a, b]));
    });
  }

  removeEdge(a, b) {
    this.edges.delete(JSON.stringify([a, b]));
    if (!this.directed) this.edges.delete(JSON.stringify([b, a]));
  }

  findNode(key) {
    return this.nodes.find((x) => x.key === key);
  }

  hasEdge(a, b) {
    return this.edges.has(JSON.stringify([a, b]));
  }

  setEdgeWeight(a, b, weight) {
    this.edges.set(JSON.stringify([a, b]), { a, b, weight });
    if (!this.directed) this.edges.set(JSON.stringify([b, a]), { a: b, b: a, weight });
  }

  getEdgeWeight(a, b) {
    const edge = this.edges.get(JSON.stringify([a, b]));
    return edge && edge.weight;
  }

  adjacent(key) {
    return [...this.edges.values()].reduce((acc, { a, b }) => {
      if (a === key) acc.push(b);
      return acc;
    }, []);
  }

  indegree(key) {
    return [...this.edges.values()].reduce((acc, { b }) => {
      if (b === key) acc++;
      return acc;
    }, 0);
  }

  outdegree(key) {
    return [...this.edges.values()].reduce((acc, { a }) => {
      if (a === key) acc++;
      return acc;
    }, 0);
  }

  toString() {
    let list = {};
    for (const { key } of this.nodes) {
      list[key] = [];
      for (const [, { a, b, weight }] of this.edges) if (a === key) list[key].push([b, weight]);
    }
    return list;
  }

  /* istanbul ignore next */ print(raw = false) {
    console.info(raw ? this : this.toString());
  }
}
