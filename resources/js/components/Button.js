export default class Button {
    button = null;
    constructor(rootDiv, id) {
        this.button = rootDiv.querySelector("#" + id);
        if (!this.button) {
            throw new Error("Button is required!");
        }
    }
}
