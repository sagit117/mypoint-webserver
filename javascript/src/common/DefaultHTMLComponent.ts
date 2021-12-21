export default class DefaultHTMLComponent {
    protected rootDiv: HTMLDivElement | null = null;

    constructor(idOrDiv: string | HTMLDivElement) {
        if (typeof idOrDiv === "string") {
            this.rootDiv = document.getElementById(idOrDiv) as HTMLDivElement;
        } else {
            this.rootDiv = idOrDiv;
        }

        if (!this.rootDiv) {
            throw new Error("rootDiv is required!");
        }
    }
}