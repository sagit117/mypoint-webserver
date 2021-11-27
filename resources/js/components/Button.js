export default class Button {
    button = null;
    constructor(rootDiv, id, clickHandler) {
        this.button = rootDiv.querySelector("#" + id);
        if (this.button) {
            this.button.addEventListener("click", this.click.bind(this, clickHandler));
        }
        else {
            throw new Error("Button is required!");
        }
    }
    disable() {
        if (!this.button)
            return;
        this.button.disabled = true;
    }
    enable() {
        if (!this.button)
            return;
        this.button.disabled = false;
    }
    click(clickHandler) {
        if (!this.button?.disabled)
            clickHandler();
    }
}
