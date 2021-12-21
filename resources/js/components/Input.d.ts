import DefaultHTMLComponent, { TDefaultHTMLElement } from "../common/DefaultHTMLComponent.js";
/** Класс для управления элементами ввода (Input) */
export default class Input extends DefaultHTMLComponent implements IInput {
    private smallMessage;
    /**
     * Конструктор
     * @param rootDiv - корневой элемент
     * @param onInputHandler - обработчик ввода
     */
    constructor(rootDiv: HTMLInputElement | null, onInputHandler: (event: Event) => void);
    /** управление классами валидации */
    setValid(msg?: string): void;
    isValid(): boolean;
    setInValid(msg?: string): void;
    isInValid(): boolean;
    /** Снять всю валидацию */
    unsetValidate(): void;
}
export interface IInputEventChanged extends Event {
    currentTarget: IEventTarget | null;
}
export interface IEventTarget extends EventTarget {
    value?: string;
}
export interface IInput {
    set value(v: string);
    get value(): string;
    setValid(msg?: string): void;
    isValid(): boolean;
    setInValid(msg?: string): void;
    isInValid(): boolean;
    unsetValidate(): void;
    getTarget(): TDefaultHTMLElement;
}
