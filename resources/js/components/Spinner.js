import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
export default class Spinner extends DefaultHTMLComponent {
    constructor(rootDiv) {
        super(rootDiv);
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
