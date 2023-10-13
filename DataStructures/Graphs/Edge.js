import GraphNode from "./GraphNode.js";


export default class Edge {
    #beginTerminal
    #endTerminal
    //undirected == 0; directed = 1;
    #edgeMode
    #weight

    constructor(begin, end, options = {directed: 0, weight: undefined}) {
        if (!begin instanceof GraphNode ) {
            throw new TypeError("invalid begin Node");
        } else if (!end instanceof GraphNode) {
            throw new TypeError("invalid end Node");
        } else if (typeof options.directed != "number") {
            throw new TypeError("mode should be a number, 0 for directed, 1 for undirected");
        }
        //implement type check
        this.#beginTerminal = begin;
        this.#endTerminal = end;
        this.#edgeMode = options.directed;
    }

    static reverseEdge(edge) {
        return new Edge(edge.endTerminal, edge.beginTerminal, {directed: edge.edgeMode, weight: edge.weight});
    }

    get weight() {
        return this.#weight || 1;
    }

    get edgeMode() {
        return this.#edgeMode;
    }

    get beginTerminal() {
        return this.#beginTerminal;
    }

    get endTerminal() {
        return this.#endTerminal;
    }
}