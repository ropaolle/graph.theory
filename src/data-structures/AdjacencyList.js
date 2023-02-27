import Graph from './Graph.js';
import BinaryTree from './BinaryTree.js';
import Tree from './Tree.js';

export default class AdjacencyList {
  constructor(adjacencyObject, type = 'adjacencyList') {
    switch (type) {
      case 'adjacencySet':
        this.list = AdjacencyList.fromSet(adjacencyObject);
        break;
      case 'adjacencyMatrix':
        this.list = AdjacencyList.fromMatrix(adjacencyObject);
        break;
      default:
        this.list = AdjacencyList.fromList(adjacencyObject);
    }
  }

  get nodes() {
    let nodes = new Set();

    for (const [node, neighbors] of Object.entries(this.list)) {
      nodes.add(node);
      for (const element of neighbors) {
        nodes.add(Array.isArray(element) ? element[0] : element);
      }
    }

    return Array.from(nodes);
  }

  get nodeCount() {
    return this.nodes.length;
  }

  get edgeCount() {
    let count = 0;
    for (const neighbors of Object.values(this.list)) {
      count += neighbors.length;
    }

    return count;
  }

  indegree(key) {
    let degree = 0;
    for (const neighbors of Object.values(this.list)) {
      for (const neighbor of neighbors) {
        if (neighbor === key) degree++;
      }
    }
    return degree;
  }

  outdegree(key) {
    if (!this.list[key]) return 0;
    return this.list[key].length;
  }

  degree(key) {
    return this.outdegree(key);
  }

  static fromList(adjacencyListObject) {
    const list = {};

    for (const [node, edges] of Object.entries(adjacencyListObject)) {
      list[node] = [];
      for (const edge of edges) {
        const [destEdge, weight] = edge.split(':');
        list[node].push(weight ? [destEdge, Number(weight)] : destEdge);
      }
    }

    return list;
  }

  static fromSet(adjacencySetObject) {
    const list = {};

    for (const edge of Object.values(adjacencySetObject)) {
      const [sourceEdge, destEdge, weight] = edge.split(':');
      if (list[sourceEdge] === undefined) list[sourceEdge] = [];
      list[sourceEdge].push(weight ? [destEdge, Number(weight)] : destEdge);
    }

    return list;
  }

  static fromMatrix(adjacencyMatrixObject, ignoreNodoToNode = true) {
    const list = {};

    const keys = Object.keys(adjacencyMatrixObject);
    for (const [node, edges] of Object.entries(adjacencyMatrixObject)) {
      list[node] = [];
      for (let i = 0; i < edges.length; i++) {
        if (ignoreNodoToNode && node === keys[i]) continue;
        if (edges[i] === Infinity) continue;
        list[node].push([keys[i], edges[i]]);
      }
    }

    return list;
  }

  static graphToAdjacencyList(graph, weighted = true) {
    let list = {};
    for (const { key } of graph.nodes) {
      if (weighted) {
        list[key] = [];
        for (const [, { a, b, weight }] of graph.edges) {
          if (a === key) list[key].push([b, weight]);
        }
      } else {
        list[key] = graph.adjacent(key);
      }
    }
    return list;
  }

  static toGraph(adjacencyListObject, directed) {
    const graph = new Graph(directed);

    for (const [node, edges] of Object.entries(adjacencyListObject)) {
      if (!graph.findNode(node)) graph.addNode(node);
      for (const edge of edges) {
        if (typeof edge !== 'string') throw new Error('Edge keys must be of type String!');
        const [edgeKey, weight] = edge.split(':');
        if (!graph.findNode(edgeKey)) graph.addNode(edgeKey);
        graph.addEdge(node, edgeKey, weight && Number(weight));
      }
    }

    return graph;
  }

  static toTree(adjacencyListObject, root, binary = false) {
    const tree = binary ? new BinaryTree(root) : new Tree(root);

    const buildTree = (adjacencyList, node, parent) => {
      if (adjacencyList[node]) {
        if (binary && adjacencyList[node].length > 2) {
          throw new Error('Nodes with more than two children is not allowed in a binary tree.');
        }
        for (const child of adjacencyList[node]) {
          if (typeof child !== 'string') throw new Error('Edge keys must be of type String!');
          if (node && node === child) {
            throw new Error(
              'Edges with the same node as the source and target are not allowed (loop).'
            );
          }
          if (child && child === parent) {
            throw new Error('Undirected edges is not allowed (loop to parent).');
          }
          tree.insert(node, child);
          buildTree(adjacencyList, child, node);
        }
      }
      return tree;
    };

    return buildTree(adjacencyListObject, root);
  }

  static toBinaryTree(adjacencyListObject, root) {
    return this.toTree(adjacencyListObject, root, true);
  }

  toString(type = 'graphviz', weight = true) {
    const mermaidCircle = (n) => `${n}((${n}))`;

    let graphStr = '';

    if (type === 'graphviz') {
      graphStr += `digraph MyGraph {\n\n`;
      for (const [node, children] of Object.entries(this.list)) {
        if (weight) {
          for (const [key, value] of children) {
            graphStr += `  ${node} -> ${key} [label="${value}"]\n`;
          }
        } else {
          graphStr += `  ${node} -> {${children.join(', ')}}\n`;
        }
      }
      graphStr += '\n}';
    } else if (type === 'mermaid') {
      graphStr += `\`\`\`mermaid\ngraph LR\n`;
      for (const [node, children] of Object.entries(this.list)) {
        if (weight) {
          for (const [key, value] of children) {
            graphStr += `  ${mermaidCircle(node)} -- ${value} --> ${mermaidCircle(key)}\n`;
          }
        } else {
          graphStr += `  ${node} --> ${children.join(' & ')}\n`;
        }
      }
      graphStr += '```';
    } else if (type === 'd3') {
      let nodes = '  nodes: [\n';
      let links = '  links: [\n';
      for (const [node, children] of Object.entries(this.list)) {
        nodes += `    { id: '${node}' },\n`;
        for (const [key, value] of children) {
          if (weight) {
            links += `    { source: '${node}', target: '${key}', label: '${value}' },\n`;
          } else {
            links += `    { source: '${node}', target: '${key}' },\n`;
          }
        }
      }
      graphStr += `\nconst data = {\n${nodes}  ],\n${links}  ]\n}\n`;
    }

    return graphStr;
  }

  /* istanbul ignore next */ print(type, weight) {
    if (!type) {
      return console.info(this.list);
    }

    if (type === 'raw') {
      const list = {};
      for (const [node, children] of Object.entries(this.list)) {
        list[node] = children.map((child) => (Array.isArray(child) ? child.join(':') : child));
      }
      return console.info(list);
    }

    console.info(this.toString(type, weight));
  }
}
