import { IApi } from "../common/Api.js";
import DataTable from "./DataTable.js";

export default class AdminUserDataTable extends DataTable {
    protected api: IApi | null = null;
    
    constructor(rootDiv: string | null, api: IApi | null) {
        super(rootDiv);

        this.api = api;

        this.cells?.forEach((cell: HTMLDivElement) => {
            if (cell.dataset["headerName"] === "_id") {
                cell.addEventListener("click", (e) => {
                    const id = cell.innerHTML;

                    /** Получить email пользователя по id */
                    const user = this.rows.find(row => row["_id"] === id);

                    if (user && "email" in user) {
                        const email = user["email"];
                        console.log(email)
                    }

                    // e.preventDefault();
                })
            }
        })
    }
}