import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
/** Класс для управления компонентом прелоадера */
export default class Spinner extends DefaultHTMLComponent implements ISpinner {
    constructor(rootDiv: HTMLDivElement | null);
    show(): void;
    hide(): void;
}
export interface ISpinner {
    show(): void;
    hide(): void;
}
