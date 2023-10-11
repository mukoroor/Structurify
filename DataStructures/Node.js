export default class Node {
    #data

    constructor(data) {
        this.#data = data;
    }

    get data() {
        return this.#data;
    }

    set data(newData) {
        this.#data = newData;
    }
}