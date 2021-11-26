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
}

export interface IInputEventChanged extends Event {
    currentTarget: IEventTarget | null
}

export interface IEventTarget extends EventTarget {
    value?: string
}