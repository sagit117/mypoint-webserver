import AdminUserDataTable from "./components/AdminUserDataTable.js";
import Api from './common/Api.js';
import { API_URL } from './common/const.js';
const adminUserTableController = new AdminUserDataTable("user_table", new Api(API_URL));
console.log(adminUserTableController);
