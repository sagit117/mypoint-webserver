export default class Button {
    private button: HTMLButtonElement | null = null;

    constructor(rootDiv: HTMLDivElement, id: string) {
        this.button = rootDiv.querySelector("#" + id);
        
        if (!this.button) {
            throw new Error("Button is required!")
        }
    }
}