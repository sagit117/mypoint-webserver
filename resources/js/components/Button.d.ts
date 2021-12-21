import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
export default class Button extends DefaultHTMLComponent implements IButton {
    constructor(rootDiv: HTMLButtonElement | null, clickHandler: () => void);
    click(clickHandler: () => void): void;
}
export interface IButton {
    disable(): void;
    enable(): void;
    click(clickHandler: () => void): void;
}
