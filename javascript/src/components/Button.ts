export default class Button {
    private button: HTMLButtonElement | null = null;

    constructor(rootDiv: HTMLDivElement, id: string, clickHandler: () => void) {
        this.button = rootDiv.querySelector("#" + id);
        
        if (this.button) {
            this.button.addEventListener("click", this.click.bind(this, clickHandler))
        } else {
            throw new Error("Button is required!")
        }
    }

    public disable() {
        if (!this.button) return;

        this.button.disabled = true;
    }

    public enable() {
        if (!this.button) return;

        this.button.disabled = false;
    }

    private click(clickHandler: () => void) {
        if (!this.button?.disabled) clickHandler()
    }
}