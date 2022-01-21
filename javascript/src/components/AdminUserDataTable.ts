import DataTable from "./DataTable.js";

export default class AdminUserDataTable extends DataTable {
    constructor(rootDiv: string | null) {
        super(rootDiv);

        this.cells?.forEach((cell: HTMLDivElement) => {
            cell.addEventListener("mousemove", () => {
                console.log(cell.dataset["rowIndex"])
            })
        })
    }
}