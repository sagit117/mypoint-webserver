import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
export default class DataTable extends DefaultHTMLComponent {
    protected cells: NodeListOf<HTMLDivElement> | undefined;
    protected rows: Array<Object>;
    constructor(rootDiv: string | null);
}
