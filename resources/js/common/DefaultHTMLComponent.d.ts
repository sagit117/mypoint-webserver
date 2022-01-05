/**
 * Базовый класс для создания компонентов
 */
export default class DefaultHTMLComponent {
    protected rootDiv: TDefaultHTMLElement;
    protected isShow: boolean;
    /**
     * Конструктор
     * @param idOrDiv - строка с ID или сам корневой элемент
     * @param isShow - отображать или скрывать корневой елемент
     */
    constructor(idOrDiv: string | TDefaultHTMLElement, isShow?: boolean);
    /**
     * Переключатель отображения корневого элемента (показать/скрыть)
     * @param display - какой параметр display будет применен при отображение корневого элемента
     * @returns
     */
    toggleShow(display?: string): void;
    /**
     * Заблокировать корневой элемент, например кнопку(Button)
     * @returns
     */
    disable(): void;
    /**
     * Разблокировать корневой элемент, например кнопку(Button)
     * @returns
     */
    enable(): void;
    /**
     * Установить значение поля ввода
     */
    set value(v: string);
    /**
     * Получить значение поля ввода
     */
    get value(): string;
    /**
     * Получить корневой элемент
     * @returns TDefaultHTMLElement
     */
    getTarget(): TDefaultHTMLElement;
}
export declare type TDefaultHTMLElement = HTMLDivElement | HTMLButtonElement | HTMLInputElement | HTMLFormElement | null;
