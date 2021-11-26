export default class Input {
    input = null;
    constructor(rootDiv, id, onInputHandler) {
        this.input = rootDiv.querySelector("#" + id);
        if (this.input) {
            this.input.addEventListener("input", onInputHandler);
        }
        else {
            throw new Error("Input is required!");
        }
    }
    set value(v) {
        if (this.input) {
            this.input.value = v;
        }
    }
    get value() {
        return this.input?.value || "";
    }
}
