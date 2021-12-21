import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
/** Класс для управления элементами кнопка(button) */
export default class Button extends DefaultHTMLComponent {
    /**
     * Конструктор
     * @param rootDiv - Корневой элемент
     * @param clickHandler - обработчик нажатия
     */
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
