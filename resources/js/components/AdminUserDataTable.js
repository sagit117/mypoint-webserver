import DataTable from "./DataTable.js";
export default class AdminUserDataTable extends DataTable {
    constructor(rootDiv) {
        super(rootDiv);
        this.cells?.forEach((cell) => {
            cell.addEventListener("mousemove", () => {
                console.log(cell.dataset["rowIndex"]);
            });
        });
    }
}
