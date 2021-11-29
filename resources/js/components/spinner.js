export default class Spinner {
    spinner = null;
    constructor(rootDiv, id) {
        this.spinner = rootDiv.querySelector("#" + id);
        if (!this.spinner) {
            throw new Error("Spinner is required!");
        }
    }
    show() {
        if (this.spinner) {
            this.spinner.style.display = "block";
        }
    }
    hide() {
        if (this.spinner) {
            this.spinner.style.display = "none";
        }
    }
}
