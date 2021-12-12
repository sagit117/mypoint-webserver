export default class Input {
    private input: HTMLInputElement | null = null;
    private smallMessage: HTMLSpanElement | null = null;

    constructor(rootDiv: HTMLDivElement, id: string, onInputHandler: (event: Event) => void) {
        this.input = rootDiv.querySelector("#" + id);
        
        if (this.input) {
            this.input.addEventListener("input", onInputHandler)

            this.smallMessage = rootDiv.querySelector("#" + id + "_msg");
        } else {
            throw new Error("Input is required!")
        }
    }

    set value(v: string) {
        if (this.input) {
            this.input.value = v
        }
    }
    get value(): string {
        return this.input?.value || ""
    }

    /** управление классами валидации */
    setValid(msg?: string) {
        this.input?.classList.add("valid")
        this.input?.classList.remove("inValid")
        
        if (msg !== undefined && this.smallMessage) {
            this.smallMessage.textContent = msg
            this.smallMessage.classList.add("valid")
            this.smallMessage.classList.remove("inValid")
        }
    }
    isValid(): boolean {
        return this.input?.classList.contains("valid") || false;
    }

    setInValid(msg?: string) {
        this.input?.classList.add("inValid")
        this.input?.classList.remove("valid")
        
        if (msg !== undefined && this.smallMessage) {
            this.smallMessage.textContent = msg
            this.smallMessage.classList.add("inValid")
            this.smallMessage.classList.remove("valid")
        }
    }
    isInValid(): boolean {
        return this.input?.classList.contains("inValid") || false;
    }

    unsetValidate() {
        this.input?.classList.remove("valid")
        this.input?.classList.remove("inValid")

        if (this.smallMessage) {
            this.smallMessage.classList.remove("valid")
            this.smallMessage.classList.remove("inValid")

            this.smallMessage.textContent = ""
        }
    }

    getTarget() {
        return this.input
    }
}

export interface IInputEventChanged extends Event {
    currentTarget: IEventTarget | null
}

export interface IEventTarget extends EventTarget {
    value?: string
}