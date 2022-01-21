import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";

export default class DataTable extends DefaultHTMLComponent {
    protected cells: NodeListOf<HTMLDivElement> | undefined;
    protected rows: Array<Object> = [];

    constructor(rootDiv: string | null) {
        super(rootDiv);

        if (this.rootDiv) {
            this.cells = this.rootDiv.querySelectorAll<HTMLDivElement>(".table-cell");
            
            let idx = 0;
            this.cells.forEach(cell => {
                if (!this.rows.length) {
                    this.rows.push({});
                }

                if (this.rows[idx].hasOwnProperty(cell.dataset["headerName"] || "")) {
                    idx++;
                    this.rows.push({});
                } else {
                    const key = cell.dataset["headerName"];

                    if (key) Object.assign(this.rows[idx], { [key]: cell.innerHTML });
                }

                cell.dataset["rowIndex"] = idx.toString();
            })
        }
    }
}