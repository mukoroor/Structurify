import Graph from "./Graphs/Graph.js";
import GraphNode from "./Graphs/GraphNode.js";

const gr = new Graph(0, 1);
const a = [];
for (let charCode = 'A'.charCodeAt(0); charCode <= 'L'.charCodeAt(0); charCode++) {
    const character = String.fromCharCode(charCode);
    a.push(new GraphNode(character));
  } 

const e = [[0, 1], [1, 2], [1, 3], [4, 1], [1, 4], [2, 5], [5, 2], [4, 5], [4, 6], [5, 7], [6, 7], [8, 6], [6, 9], [9, 8], [7, 10], [10, 11], [11, 9]].sort((a, b) => a[0] - b[0])
a.forEach(e => gr.addNode(e));
e.forEach(ed => {
    let [begin, end] = ed;
    gr.addEdge(a[begin], a[end]);
})

console.log(gr.depthFirstSearch(a[0]));
console.log(gr.breadthFirstSearch(a[0]));
console.log(gr.topoLogicalSort(a[0]));
console.log(gr.stronglyConnnectComponents());