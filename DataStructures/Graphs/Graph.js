import GraphNode from "./GraphNode.js";
import Edge from "./Edge.js";

export default class Graph {
    #nodes = new Set();
    #edges = new Map();
    #degreeStore = new Map();
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
    addEdge(begin, end, weight = undefined) {
        const e = new Edge(begin, end, {...this.#characteristics, weight});
        if (this.#adjacencyMode) {

        } else {
            if (this.#adjacencyStore.has(begin)) {
                this.#adjacencyStore.get(begin).push(e);
            } else {
                this.#adjacencyStore.set(begin, [e]);
            }
            // this.#degreeStore.set(end, this..in++;

            if (!this.#characteristics.directed) {
                const reversed = Edge.reverseEdge(e);
                if (this.#adjacencyStore.has(end)) {
                    this.#adjacencyStore.get(end).push(reversed);
                    // this.#degreeStore.get(begin).out++;
                    // this.#degreeStore.get(end).out++;
                } else {
                    // this.#degreeStore.set(end, {in: 0, out: 1});
                    this.#adjacencyStore.set(end, [reversed]);
                }
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

    depthFirstSearch(start, visited = new Set(), stack = [], dist = 0) {
;        if (!this.#nodes.has(start)) {
            throw new Error("GraphNode start does not exist in Graph");
        }

        const neighbors = this.#adjacencyStore.get(start);
        visited.add(start);
        stack.push([start, dist]);

        if (neighbors) {    
            for (const edge of neighbors) {
                if (!visited.has(next))  this.depthFirstSearch(edge.endTerminal, visited, stack, dist + edge.weight);
            }
        }
        return stack;
    }

    breadthFirstSearch(start) {
        if (!this.#nodes.has(start)) {
            throw new Error("GraphNode start does not exist in Graph");
        }

        const queue = [start, 0];
        const visited = new Set();
        const stack = [];

        while (queue.length != 0) {
            const currNode = queue.shift();
            stack.push(currNode);
            visited.add(currNode[0]);
            const neighbors = this.#adjacencyStore.get(currNode);

            if (neighbors) {
                for (const edge of neighbors) {
                    if (!visited.has(edge.endTerminal)) queue.push([edge.endTerminal, currNode[1] + edge.weight]);
                }
            }
        }
        return stack;
    }

    topoLogicalSort(source) {
        function explore(start, visited, stack, clock = 1) {
            if (!this.#nodes.has(start)) {
                throw new Error("GraphNode start does not exist in Graph");
            }
            const neighbors = this.#adjacencyStore.get(start);
            const prePost = [clock++];
            visited.add(start);
            stack.push({node: start, prePost});
    
            if (neighbors) {
                for (const edge of neighbors) {
                    if (!visited.has(next)) clock = this.explore(next, visited, stack, clock);
                }
            }
            prePost.push(clock++);
            return clock;
        }

        const visited = new Set();
        const stack = [];
        let clock = explore(source, visited, stack);
        
        for (const node of this.#nodes) {
            if (!visited.has(node)) clock = explore(node, visited, stack, clock++);
        }
        return stack;
    }
}