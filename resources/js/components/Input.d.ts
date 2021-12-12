export default class Input {
    private input;
    private smallMessage;
    constructor(rootDiv: HTMLDivElement, id: string, onInputHandler: (event: Event) => void);
    set value(v: string);
    get value(): string;
    /** управление классами валидации */
    setValid(msg?: string): void;
    isValid(): boolean;
    setInValid(msg?: string): void;
    isInValid(): boolean;
    unsetValidate(): void;
    getTarget(): HTMLInputElement | null;
}
export interface IInputEventChanged extends Event {
    currentTarget: IEventTarget | null;
}
export interface IEventTarget extends EventTarget {
    value?: string;
}
