import DataTable from "./DataTable.js";
export default class AdminUserDataTable extends DataTable {
    constructor(rootDiv) {
        super(rootDiv);
        // this.cells?.forEach((cell: HTMLDivElement) => {
        //     cell.addEventListener("mousemove", () => {
        //         const index = cell.dataset["rowIndex"]?.toString() || "-1";
        //         const headerName = cell.dataset["headerName"]?.toString();
        //         if (headerName) {
        //             this.rows[+index][headerName] = "test"
        //         }
        //     })
        // })
    }
}
