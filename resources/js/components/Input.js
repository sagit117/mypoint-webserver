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
    /** управление классами валидации */
    set isValid(v) {
        if (v) {
            this.input?.classList.add("valid");
        }
        else {
            this.input?.classList.remove("valid");
        }
    }
    get isValid() {
        return this.input?.classList.contains("valid") || false;
    }
    set isInValid(v) {
        if (v) {
            this.input?.classList.add("inValid");
        }
        else {
            this.input?.classList.remove("inValid");
        }
    }
    get isInValid() {
        return this.input?.classList.contains("inValid") || false;
    }
}
