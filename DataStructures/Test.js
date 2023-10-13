import Graph from "./Graphs/Graph.js";
import GraphNode from "./Graphs/GraphNode.js";

const gr = new Graph(0, 1);

const a = [new GraphNode("A"),
new GraphNode("B"),
new GraphNode("C"),
new GraphNode("D"),
new GraphNode("E"),
new GraphNode("F"),
new GraphNode("G"),
new GraphNode("H")]

const e = [[0, 1], [0, 2], [0, 5], [1, 4], [4, 5], [4, 6], [4, 7], [5, 6], [5, 1], [2, 3], [3, 0], [3, 7], [7, 6]].sort((a, b) => a[0] - b[0])
a.forEach(e => gr.addNode(e));
e.forEach(ed => {
    let [begin, end] = ed;
    gr.addEdge(a[begin], a[end]);
})

console.log(gr.depthFirstSearch(a[0]));
console.log(gr.breadthFirstSearch(a[0]));
console.log(gr.topoLogicalSort(a[0]));