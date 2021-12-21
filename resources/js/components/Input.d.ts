import DefaultHTMLComponent, { TDefaultHTMLElement } from "../common/DefaultHTMLComponent.js";
export default class Input extends DefaultHTMLComponent implements IInput {
    private smallMessage;
    constructor(rootDiv: HTMLInputElement | null, onInputHandler: (event: Event) => void);
    /** управление классами валидации */
    setValid(msg?: string): void;
    isValid(): boolean;
    setInValid(msg?: string): void;
    isInValid(): boolean;
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
