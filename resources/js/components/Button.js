import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
export default class Button extends DefaultHTMLComponent {
    constructor(rootDiv, clickHandler) {
        super(rootDiv);
        if (this.rootDiv) {
            this.rootDiv.addEventListener("click", this.click.bind(this, clickHandler));
        }
        else {
            throw new Error("Button is required!");
        }
    }
    click(clickHandler) {
        if (!this.rootDiv || !("disabled" in this.rootDiv))
            return;
        if (!this.rootDiv?.disabled)
            clickHandler();
    }
}
