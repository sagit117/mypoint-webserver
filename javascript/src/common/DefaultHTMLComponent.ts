/**
 * Базовый класс для создания компонентов
 */
export default class DefaultHTMLComponent {
    protected rootDiv: TDefaultHTMLElement = null;
    protected isShow = false;

    /**
     * Конструктор
     * @param idOrDiv - строка с ID или сам корневой элемент
     * @param isShow - отображать или скрывать корневой елемент
     */
    constructor(idOrDiv: string | TDefaultHTMLElement, isShow: boolean = true) {
        if (typeof idOrDiv === "string") {
            this.rootDiv = document.getElementById(idOrDiv) as HTMLDivElement;
        } else {
            this.rootDiv = idOrDiv || null;
        }

        if (!this.rootDiv) {
            throw new Error("rootDiv is required!");
        } else {
            this.isShow = isShow;
            if (!this.isShow) this.rootDiv.style.display = "none";
        }
    }

    /**
     * Переключатель отображения корневого элемента (показать/скрыть)
     * @param display - какой параметр display будет применен при отображение корневого элемента
     * @returns 
     */
    public toggleShow(display: string = "block") {
        if (!this.rootDiv) return;

        if (this.isShow) {
            this.rootDiv.style.display = "none";
        } else {
            this.rootDiv.style.display = display;
        }

        this.isShow = !this.isShow;
    }

    /**
     * Заблокировать корневой элемент, например кнопку(Button)
     * @returns 
     */
    public disable() {
        if (!this.rootDiv || !("disabled" in this.rootDiv)) return;

        this.rootDiv.disabled = true;
    }
    /**
     * Разблокировать корневой элемент, например кнопку(Button)
     * @returns 
     */
    public enable() {
        if (!this.rootDiv || !("disabled" in this.rootDiv)) return;

        this.rootDiv.disabled = false;
    }

    /**
     * Установить значение поля ввода
     */
    set value(v: string) {
        if (this.rootDiv && ("value" in this.rootDiv)) {
            this.rootDiv.value = v
        }
    }
    /**
     * Получить значение поля ввода
     */
    get value(): string {
        if (this.rootDiv && ("value" in this.rootDiv)) return this.rootDiv.value;
        else return ""
    }

    /**
     * Получить корневой элемент
     * @returns TDefaultHTMLElement
     */
    public getTarget(): TDefaultHTMLElement {
        return this.rootDiv
    }

    public setTabIndex(index: string) {
        if (this.rootDiv) {
            this.rootDiv.setAttribute("tabIndex", index);
        }
    }
}

export type TDefaultHTMLElement = HTMLDivElement | HTMLButtonElement | HTMLInputElement | HTMLFormElement | null