import GraphManipulator from "./GraphManipulator.js";

export default class GraphRenderer {
    #canvas

    constructor() {
        this.#canvas = document.createElement("canvas");
        this.#canvas.classList.add("renderer");
    }

    updateView(nodes, edges) {
        this.#canvas.width = 2 * this.#canvas.offsetWidth;
        this.#canvas.height = 2 * this.#canvas.offsetHeight;
        // console.log(this.#canvas.getBoundingClientRect())

        let pos = new Map();
        let c = this.#canvas.getContext("2d");
        // c.scale(2, 2);
        c.font = "bold 10pt serif";
        for (const n of nodes) {
            let p = [this.#canvas.width * Math.random(), this.#canvas.height * Math.random()];
            pos.set(n, p);
        }

        for (const e of edges) {
            const [b0, b1] = pos.get(e.beginTerminal);
            const [e0, e1] = pos.get(e.endTerminal);
            c.beginPath(); // Start a new path for each circle
            c.moveTo(b0, b1);
            c.lineTo(e0, e1);
            c.closePath();
            c.lineWidth = 2; // Set the border width
            c.stroke(); // Draw the border of the circle
        }

        for (const [n, p] of pos) {
            c.fillStyle = "white"; // Set fill color to transparent
            c.translate(p[0], p[1]);
            c.beginPath(); // Start a new path for each circle
            c.arc(0, 0, 20, 0, 2 * Math.PI);
            c.closePath();
            c.fill();
            c.lineWidth = 2; // Set the border width
            // c.strokeStyle = "blue"; // Set the border color
            c.stroke(); // Draw the border of the circle
            c.fillStyle = "black";
            c.fillText(n.data, -5, 5);
            c.translate(-p[0], -p[1]);
        }

        console.log(pos);
    }

    get canvas() {
        return this.#canvas
    }
}