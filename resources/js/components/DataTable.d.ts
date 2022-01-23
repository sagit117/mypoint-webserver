import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
export default class DataTable extends DefaultHTMLComponent {
    protected cells: NodeListOf<HTMLDivElement> | undefined;
    protected rows: Array<ITarget>;
    constructor(rootDiv: string | null);
    /** Установить значение ячейки */
    setCell(rowIndex: number, headerName: string, valueHTML: string): void;
}
interface ITarget {
    [key: string]: string;
}
export {};
