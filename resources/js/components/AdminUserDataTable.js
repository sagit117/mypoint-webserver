import DataTable from "./DataTable.js";
export default class AdminUserDataTable extends DataTable {
    api = null;
    constructor(rootDiv, api) {
        super(rootDiv);
        this.api = api;
        this.cells?.forEach((cell) => {
            if (cell.dataset["headerName"] === "_id") {
                cell.addEventListener("click", (e) => {
                    const id = cell.innerHTML;
                    /** Получить email пользователя по id */
                    const user = this.rows.find(row => row["_id"] === id);
                    if (user && "email" in user) {
                        const email = user["email"];
                        console.log(email);
                    }
                    // e.preventDefault();
                });
            }
        });
    }
}
