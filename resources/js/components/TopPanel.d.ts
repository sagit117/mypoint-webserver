import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
import { ISideMenu } from "./SideMenu.js";
/** Класс для управлепния верхней панелью */
export default class TopPanel extends DefaultHTMLComponent {
    private leftSideMenu;
    private leftSideMenuToggle;
    constructor(id: string, leftSideMenu: ISideMenu);
}
