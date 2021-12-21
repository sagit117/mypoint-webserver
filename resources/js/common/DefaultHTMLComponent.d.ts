export default class DefaultHTMLComponent {
    protected rootDiv: TDefaultHTMLElement;
    protected isShow: boolean;
    constructor(idOrDiv: string | TDefaultHTMLElement, isShow?: boolean);
    toggleShow(display?: string): void;
    disable(): void;
    enable(): void;
    set value(v: string);
    get value(): string;
    getTarget(): TDefaultHTMLElement;
}
export declare type TDefaultHTMLElement = HTMLDivElement | HTMLButtonElement | HTMLInputElement | null;
