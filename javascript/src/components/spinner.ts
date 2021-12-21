import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";

export default class Spinner extends DefaultHTMLComponent implements ISpinner {
    constructor(rootDiv: HTMLDivElement | null) {
        super(rootDiv)
    }

    show() {
        if (this.rootDiv) {
            this.rootDiv.style.display = "block";
        }
    }

    hide() {
        if (this.rootDiv) {
            this.rootDiv.style.display = "none";
        }
    }
}

export interface ISpinner {
    show(): void;
    hide(): void;
}