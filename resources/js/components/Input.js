import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
export default class Input extends DefaultHTMLComponent {
    smallMessage = null;
    constructor(rootDiv, onInputHandler) {
        super(rootDiv);
        if (this.rootDiv) {
            this.rootDiv.addEventListener("input", onInputHandler);
            this.smallMessage = rootDiv?.parentElement?.querySelector("#" + this.rootDiv.id + "_msg") || null;
        }
        else {
            throw new Error("Input is required!");
        }
    }
    /** управление классами валидации */
    setValid(msg) {
        this.rootDiv?.classList.add("valid");
        this.rootDiv?.classList.remove("inValid");
        if (msg !== undefined && this.smallMessage) {
            this.smallMessage.textContent = msg;
            this.smallMessage.classList.add("valid");
            this.smallMessage.classList.remove("inValid");
        }
    }
    isValid() {
        return this.rootDiv?.classList.contains("valid") || false;
    }
    setInValid(msg) {
        this.rootDiv?.classList.add("inValid");
        this.rootDiv?.classList.remove("valid");
        if (msg !== undefined && this.smallMessage) {
            this.smallMessage.textContent = msg;
            this.smallMessage.classList.add("inValid");
            this.smallMessage.classList.remove("valid");
        }
    }
    isInValid() {
        return this.rootDiv?.classList.contains("inValid") || false;
    }
    unsetValidate() {
        this.rootDiv?.classList.remove("valid");
        this.rootDiv?.classList.remove("inValid");
        if (this.smallMessage) {
            this.smallMessage.classList.remove("valid");
            this.smallMessage.classList.remove("inValid");
            this.smallMessage.textContent = "";
        }
    }
}
