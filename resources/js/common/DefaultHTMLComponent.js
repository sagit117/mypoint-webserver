export default class DefaultHTMLComponent {
    rootDiv = null;
    constructor(idOrDiv) {
        if (typeof idOrDiv === "string") {
            this.rootDiv = document.getElementById(idOrDiv);
        }
        else {
            this.rootDiv = idOrDiv;
        }
        if (!this.rootDiv) {
            throw new Error("rootDiv is required!");
        }
    }
}
