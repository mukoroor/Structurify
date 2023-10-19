import Graph from "./Graphs/Graph.js";
import GraphManipulator from "./Graphs/GraphManipulator.js";
import GraphNode from "./Graphs/GraphNode.js";

const control = new GraphManipulator();
document.querySelector("body").append(control.container);
const gr = control.graph;
let a = [];
for (let charCode = 'A'.charCodeAt(0); charCode <= 'L'.charCodeAt(0); charCode++) {
    const character = String.fromCharCode(charCode);
    a.push(character);
  } 

const e = [[0, 1], [1, 2], [1, 3], [4, 1], [1, 4], [2, 5], [5, 2], [4, 5], [4, 6], [5, 7], [6, 7], [8, 6], [6, 9], [9, 8], [7, 10], [10, 11], [11, 9]].sort((a, b) => a[0] - b[0])
a = a.map(e => gr.addNode(e));
e.forEach(ed => {
    let [begin, end] = ed;
    gr.addEdge(a[begin], a[end]);
})

console.log(gr.depthFirstSearch(a[0]));
console.log(gr.breadthFirstSearch(a[0]));
console.log(gr.topoLogicalSort(a[0]));
console.log(gr.stronglyConnnectComponents().map(e => Array.from(e).map(ed => ed.data)));