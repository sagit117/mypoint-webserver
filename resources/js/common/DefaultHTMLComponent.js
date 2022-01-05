/**
 * Базовый класс для создания компонентов
 */
export default class DefaultHTMLComponent {
    rootDiv = null;
    isShow = false;
    /**
     * Конструктор
     * @param idOrDiv - строка с ID или сам корневой элемент
     * @param isShow - отображать или скрывать корневой елемент
     */
    constructor(idOrDiv, isShow = true) {
        if (typeof idOrDiv === "string") {
            this.rootDiv = document.getElementById(idOrDiv);
        }
        else {
            this.rootDiv = idOrDiv || null;
        }
        if (!this.rootDiv) {
            throw new Error("rootDiv is required!");
        }
        else {
            this.isShow = isShow;
            if (!this.isShow)
                this.rootDiv.style.display = "none";
        }
    }
    /**
     * Переключатель отображения корневого элемента (показать/скрыть)
     * @param display - какой параметр display будет применен при отображение корневого элемента
     * @returns
     */
    toggleShow(display = "block") {
        if (!this.rootDiv)
            return;
        if (this.isShow) {
            this.rootDiv.style.display = "none";
        }
        else {
            this.rootDiv.style.display = display;
        }
        this.isShow = !this.isShow;
    }
    /**
     * Заблокировать корневой элемент, например кнопку(Button)
     * @returns
     */
    disable() {
        if (!this.rootDiv || !("disabled" in this.rootDiv))
            return;
        this.rootDiv.disabled = true;
    }
    /**
     * Разблокировать корневой элемент, например кнопку(Button)
     * @returns
     */
    enable() {
        if (!this.rootDiv || !("disabled" in this.rootDiv))
            return;
        this.rootDiv.disabled = false;
    }
    /**
     * Установить значение поля ввода
     */
    set value(v) {
        if (this.rootDiv && ("value" in this.rootDiv)) {
            this.rootDiv.value = v;
        }
    }
    /**
     * Получить значение поля ввода
     */
    get value() {
        if (this.rootDiv && ("value" in this.rootDiv))
            return this.rootDiv.value;
        else
            return "";
    }
    /**
     * Получить корневой элемент
     * @returns TDefaultHTMLElement
     */
    getTarget() {
        return this.rootDiv;
    }
    setTabIndex(index) {
        if (this.rootDiv) {
            this.rootDiv.setAttribute("tabIndex", index);
        }
    }
}
