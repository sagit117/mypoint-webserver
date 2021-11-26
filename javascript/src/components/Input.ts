export default class Input {
    private input: HTMLInputElement | null = null;

    constructor(rootDiv: HTMLDivElement, id: string) {
        this.input = rootDiv.querySelector("#" + id);
        console.log(this.input);
    }
}