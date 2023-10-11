import GraphNode from "./GraphNode.js";
import Edge from "./Edge.js";

export default class Graph {
    #nodes
    #edges
    #adjacencyStore
    // list|map == 0, matrix == 1
    #adjacencyMode
    #characteristics

    /**
     * 
     * @param {*} adjacencyMode 
     * @param {*} directed 
     * @param {*} weighted 
     */
    constructor(adjacencyMode = 0, directed = 0, weighted = 0) {
        this.#characteristics = {directed, weighted}
        this.#nodes = new Set();
        this.#edges = new Map();
        if (adjacencyMode) {
            //Edge[][]
            this.#adjacencyStore = Array.from({length: 10}, () => Array(10));
        } else {
            //<K, V> => <GraphNode, Edge[]>
            this.#adjacencyStore = new Map();
        }
    }

    /**
     * 
     * @param {*} newNode 
     */
    addNode(newNode) {
        if (newNode instanceof GraphNode) this.#nodes.add(newNode);
    }
    
    /**
     * 
     * @param {*} begin 
     * @param {*} end 
     * @param {*} weight 
     */
    addEdge(begin, end, weight = 0) {
        const e = new Edge(begin, end, {...this.#characteristics, weight});
        if (this.#adjacencyMode) {

        } else {
            if (this.#adjacencyStore.has(begin)) this.#adjacencyStore.get(begin).push(e);
            else this.#adjacencyStore.set(begin, [e]);

            if (!this.#characteristics.directed) {
                if (this.#adjacencyStore.has(end)) this.#adjacencyStore.get(end).push(e);
                else this.#adjacencyStore.set(end, [e]);
            }
        }
    }

    /**
     * 
     */
    clear() {
        this.#nodes.clear();
        this.#adjacencyStore = [];
    }

    explore(start, visisted = new Map(), clock = 0) {
        if (!this.#nodes.has(start)) {
            throw new Error("GraphNode start does not exist in Graph");
        }
        const neighbors = this.#adjacencyStore.get(start);
        const prePost = [clock++];
        visisted.set(start, prePost);

        if (neighbors) {
            for (const edge of neighbors) {
                let next = start ==  edge.beginTerminal ? edge.endTerminal: edge.beginTerminal;
                if (!visisted.has(next)) this.explore(next, visisted, clock++);
            }
        }
        prePost.push(clock++);
    }

    breadthFirstSearch(start) {
        if (!this.#nodes.has(start)) {
            throw new Error("GraphNode start does not exist in Graph");
        }

        const queue = [start];
        const visisted = new Set();

        while (queue.length != 0) {
            const currNode = queue.shift();
            visisted.add(currNode);
            const neighbors = this.#adjacencyStore.get(currNode);

            if (neighbors) {
                for (const edge of neighbors) {
                    let next = currNode ==  edge.beginTerminal ? edge.endTerminal: edge.beginTerminal;
                    if (!visisted.has(next)) queue.push(next);
                }
            }
        }
    }

    depthFirstSearch(start, visited = new Map()) {
        this.explore(start, visited);

        for (const node of this.#nodes) {
            if (!visited.has(node)) this.explore(node, visited);
        }
        console.log(visited);
    }
}