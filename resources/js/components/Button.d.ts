import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
/** Класс для управления элементами кнопка(button) */
export default class Button extends DefaultHTMLComponent implements IButton {
    /**
     * Конструктор
     * @param rootDiv - Корневой элемент
     * @param clickHandler - обработчик нажатия
     */
    constructor(rootDiv: HTMLButtonElement | null, clickHandler: () => void);
    click(clickHandler: () => void): void;
}
export interface IButton {
    disable(): void;
    enable(): void;
    click(clickHandler: () => void): void;
}
