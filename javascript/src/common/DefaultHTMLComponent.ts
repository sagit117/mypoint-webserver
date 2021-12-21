export default class DefaultHTMLComponent {
    protected rootDiv: TDefaultHTMLElement = null;
    protected isShow = false;

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

    public toggleShow(display: string = "block") {
        if (!this.rootDiv) return;

        if (this.isShow) {
            this.rootDiv.style.display = "none";
        } else {
            this.rootDiv.style.display = display;
        }

        this.isShow = !this.isShow;
    }

    public disable() {
        if (!this.rootDiv || !("disabled" in this.rootDiv)) return;

        this.rootDiv.disabled = true;
    }
    public enable() {
        if (!this.rootDiv || !("disabled" in this.rootDiv)) return;

        this.rootDiv.disabled = false;
    }

    set value(v: string) {
        if (this.rootDiv && ("value" in this.rootDiv)) {
            this.rootDiv.value = v
        }
    }
    get value(): string {
        if (this.rootDiv && ("value" in this.rootDiv)) return this.rootDiv.value;
        else return ""
    }

    public getTarget(): TDefaultHTMLElement {
        return this.rootDiv
    }
}

export type TDefaultHTMLElement = HTMLDivElement | HTMLButtonElement | HTMLInputElement | null