export default class Spinner {
    spinner: HTMLDivElement | null;
    constructor(rootDiv: HTMLDivElement, id: string);
    show(): void;
    hide(): void;
}
