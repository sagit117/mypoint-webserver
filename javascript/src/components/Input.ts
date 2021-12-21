import DefaultHTMLComponent, { TDefaultHTMLElement } from "../common/DefaultHTMLComponent.js";

export default class Input extends DefaultHTMLComponent implements IInput {
    private smallMessage: HTMLSpanElement | null = null;

    constructor(rootDiv: HTMLInputElement | null, onInputHandler: (event: Event) => void) {
        super(rootDiv);
        
        if (this.rootDiv) {
            this.rootDiv.addEventListener("input", onInputHandler)

            this.smallMessage = rootDiv?.parentElement?.querySelector("#" + this.rootDiv.id + "_msg") || null;
        } else {
            throw new Error("Input is required!")
        }
    }

    /** управление классами валидации */
    setValid(msg?: string) {
        this.rootDiv?.classList.add("valid")
        this.rootDiv?.classList.remove("inValid")
        
        if (msg !== undefined && this.smallMessage) {
            this.smallMessage.textContent = msg
            this.smallMessage.classList.add("valid")
            this.smallMessage.classList.remove("inValid")
        }
    }
    isValid(): boolean {
        return this.rootDiv?.classList.contains("valid") || false;
    }

    setInValid(msg?: string) {
        this.rootDiv?.classList.add("inValid")
        this.rootDiv?.classList.remove("valid")
        
        if (msg !== undefined && this.smallMessage) {
            this.smallMessage.textContent = msg
            this.smallMessage.classList.add("inValid")
            this.smallMessage.classList.remove("valid")
        }
    }
    isInValid(): boolean {
        return this.rootDiv?.classList.contains("inValid") || false;
    }

    unsetValidate() {
        this.rootDiv?.classList.remove("valid")
        this.rootDiv?.classList.remove("inValid")

        if (this.smallMessage) {
            this.smallMessage.classList.remove("valid")
            this.smallMessage.classList.remove("inValid")

            this.smallMessage.textContent = ""
        }
    }
}

export interface IInputEventChanged extends Event {
    currentTarget: IEventTarget | null
}

export interface IEventTarget extends EventTarget {
    value?: string
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