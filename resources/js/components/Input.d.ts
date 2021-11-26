export default class Input {
    private input;
    constructor(rootDiv: HTMLDivElement, id: string, onInputHandler: (event: Event) => void);
    set value(v: string);
    get value(): string;
}
export interface IInputEventChanged extends Event {
    currentTarget: IEventTarget | null;
}
export interface IEventTarget extends EventTarget {
    value?: string;
}
