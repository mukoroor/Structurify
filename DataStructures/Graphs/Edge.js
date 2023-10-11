import GraphNode from "./GraphNode.js";


export default class Edge {
    #beginTerminal
    #endTerminal
    //directed == 0; undirected = 1;
    #edgeMode

    constructor(begin, end, mode = 1) {
        if (!begin instanceof GraphNode ) {
            throw new TypeError("invalid begin Node");
        } else if (!end instanceof GraphNode) {
            throw new TypeError("invalid end Node");
        } else if (typeof mode != "number") {
            throw new TypeError("mode should be a number, 0 for directed, 1 for undirected");
        }
        //implement type check
        this.#beginTerminal = begin;
        this.#endTerminal = end;
        this.#edgeMode = mode;
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