export default class Spinner {
    spinner: HTMLDivElement | null = null;

    constructor(rootDiv: HTMLDivElement, id: string) {
        this.spinner = rootDiv.querySelector("#" + id);
        
        if (!this.spinner) {
            throw new Error("Spinner is required!")
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