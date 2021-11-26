export default class Input {
    private input: HTMLInputElement | null = null;

    constructor(rootDiv: HTMLDivElement, id: string, onInputHandler: (event: Event) => void) {
        this.input = rootDiv.querySelector("#" + id);
        
        if (this.input) {
            this.input.addEventListener("input", onInputHandler)
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
    set isValid(v: boolean) {
        if (v) {
            this.input?.classList.add("valid")
        } else {
            this.input?.classList.remove("valid")
        }
    }
    get isValid(): boolean {
        return this.input?.classList.contains("valid") || false;
    }

    set isInValid(v: boolean) {
        if (v) {
            this.input?.classList.add("inValid")
        } else {
            this.input?.classList.remove("inValid")
        }
    }
    get isInValid(): boolean {
        return this.input?.classList.contains("inValid") || false;
    }
}

export interface IInputEventChanged extends Event {
    currentTarget: IEventTarget | null
}

export interface IEventTarget extends EventTarget {
    value?: string
}