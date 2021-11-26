export default class Input {
    input = null;
    constructor(rootDiv, id) {
        this.input = rootDiv.querySelector("#" + id);
        console.log(this.input);
    }
}
