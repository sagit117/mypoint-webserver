import { IApi } from "../common/Api.js";
import DataTable from "./DataTable.js";
export default class AdminUserDataTable extends DataTable {
    protected api: IApi | null;
    constructor(rootDiv: string | null, api: IApi | null);
}
