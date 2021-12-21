import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";

export default class Button extends DefaultHTMLComponent implements IButton {
    constructor(rootDiv: HTMLButtonElement | null, clickHandler: () => void) {
        super(rootDiv);
        
        if (this.rootDiv) {
            this.rootDiv.addEventListener("click", this.click.bind(this, clickHandler))
        } else {
            throw new Error("Button is required!");
        }
    }

    public click(clickHandler: () => void) {
        if (!this.rootDiv || !("disabled" in this.rootDiv)) return;

        if (!this.rootDiv?.disabled) clickHandler();
    }
}

export interface IButton {
    disable(): void;
    enable(): void;
    click(clickHandler: () => void): void;
}