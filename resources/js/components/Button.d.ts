export default class Button {
    private button;
    constructor(rootDiv: HTMLDivElement, id: string, clickHandler: () => void);
    disable(): void;
    enable(): void;
    private click;
}
