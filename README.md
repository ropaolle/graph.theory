# Graph theory

- Algorithma
  - [Graph Theory Algorithms](https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P)
  - [Interactive Graph Theory Tutorials](https://d3gt.com)
  - [8 Essential Graph Algorithms in JavaScript](https://www.freecodecamp.org/news/8-essential-graph-algorithms-in-javascript/)
  - [30 Seconds of code](https://www.30secondsofcode.org/articles/s/js-data-structures-graph)
  - [Big-O Cheet Sheet](https://www.30secondsofcode.org/articles/s/big-o-cheatsheet)
- Visualization
  - [Cytoscape.js](https://js.cytoscape.org/)
  - [react-d3-graph](https://github.com/danielcaldas/react-d3-graph)
  - [Mermaid cheat sheet](https://jojozhuang.github.io/tutorial/mermaid-cheat-sheet/)
- Etcetera  
  - [JSDoc path](file:///D:/GitHub/education/jsdoc/global.html)
  - [ESLint JSdoc](https://github.com/gajus/eslint-plugin-jsdoc)

## TODO

- Graph Theory Playlist
  - [ ] [Maximum Network Flow](https://www.youtube.com/watch?v=LdOnanfc5TM&list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P&index=33)
  - [ ] Unweighted Bipartite Matching
  - [ ] Bipartite match
  - [ ] Edmonds Karp algorithm
  - [ ] Capacity scaling
  - [ ] Dinic's algorithm
  - [ ] Negative Cycles?
  - [ ] Bridges?
  
## Graph theory - From a computer science point of view

- Vertices (nodes) and Edges: `V = {v1, v2, v3}`, `E = {v1v2, v1v3, v2v3}`
  - Undirected: `E = { {a,b}, {b,c} }`
  - Directed: `E = { (a,b), (b,c) }`
- Adjacent: Two vertices are said to be adjacent if they are connected by an edge.
- Order: The number of vertices in the graph.
- Size: Number of edges in the graph.
- Empty graph: Graph with no edges `G = (V, {})`.
- Trivial graph: Only one vertex, no edges.
- Null graph: No vertices and no deges: `G = ({}, {})`
- Simple graph: Undirected, only one edge between the same vertices, no selfterminating edges.
- Euler stuff
  - Euler circuit: Visit all edges once and sam start and end vertex (all vertices must be of even degree).
  - Euler path: Visit all edges once (must have 0 or 2 vertices of odd degree).
  - Eulerization: Adding edges until we get even degrees.
- Hamiltonian path: Visit all vertices once.
- Hamiltonian circuit: Visit all vertices once and return to the start vertex.

### Basics

[Part 2](https://www.youtube.com/watch?v=eQA-m22wjTQ&list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P&index=2)

- Types (most common)
  - Undirected, directed, weighted graphs
  - Trees, rooted trees (in-tree, out-tree)
  - Directed asyclic graphs (DAGs)
  - Bipartite graph
  - Complete graph
- Representing graps
  - Adjacency matrix
  - Adjacency list: `A -> [(B,4), (C,1), ...]`
  - Edge list: `[(C,A,4), (A,C,2), ...]`

### Common graph theory problems

[Part 3](https://www.youtube.com/watch?v=87X57ldq1ok&list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P&index=3)

- Basic questions:
  - Directed or undirected?
  - Edges weighted?
  - Sparse or dense?
  - How to represent?
- Common problems
  - Shortest path
  - Connectivity
  - Negative cycles
  - Stromgly connected components
  - Traveling salseman problem
  - Bridges
  - Minimum spanning tree (MST)
  - Network flwo (max flow)

### Deep First Search (DFS)

[DFS](https://www.youtube.com/watch?v=7fujbpJ0LB4&list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P&index=4&t=20s)

## Shortest Path Algorithms

|                                   | BFS                             | Dijkstra’s     | Bellman Ford | Floyd Warshall |
|-----------------------------------|---------------------------------|----------------|--------------|----------------|
| Complexity                        | O(V+E)                          | O((V+E)logV)   | O(VE)        | O((V+E)logV)   |
| Recommended graph size            | Large                           | Large/Medium   | Medium/Small | Smal           |
| Good for APSP?                    | Only works on unweighted graphs | Ok             | Bad          | Yes            |
| Can detect negative cycles?       | No                              | No             | Yes          | Yes            |
| SP on graph with weighted edges   | Incorrect SP answer             | Best algorithm | Works        | Bad in general |
| SP on graph with unweighted edges | Best algorithm                  | Ok             | Bad          | Bad in general |

## Validate Eulerian paths and circuits

[Info](https://www.youtube.com/watch?v=xR4sGgwtR2I&list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P&index=27)

| Graph type  | Eulerian Circuit                         | Eulerian Path                                                |
|-------------|------------------------------------------|--------------------------------------------------------------|
| Un-directed | Every vertex has even degree             | Every vertex has even degree or exactly two have odd degree. |
| Directed    | Every vertex has equal in- and outdegree | Max one vertex with outdegree-indegree === 1 and <br>max one vertex with indegree-outdegree === 1.<br>Every other vertex has equal in- and outdegree.             |
