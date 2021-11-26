export default class Input {
    input = null;
    constructor(rootDiv, id) {
        this.input = rootDiv.querySelector("#" + id);
        if (!this.input) {
            throw new Error("Input is required!");
        }
    }
}
