import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";

/** Класс для управления элементами кнопка(button) */
export default class Button extends DefaultHTMLComponent implements IButton {
    /**
     * Конструктор
     * @param rootDiv - Корневой элемент
     * @param clickHandler - обработчик нажатия
     */
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
    setTabIndex(index: string): void;
}