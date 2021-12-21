import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
import { ISideMenu } from "./SideMenu.js";

/** Класс для управлепния верхней панелью */
export default class TopPanel extends DefaultHTMLComponent {
    private leftSideMenu: ISideMenu | null = null;
    private leftSideMenuToggle: HTMLDivElement | null = null;

    constructor(id: string, leftSideMenu: ISideMenu) {
        super(id);
        
        if (this.rootDiv) {
            this.leftSideMenu = leftSideMenu;
            this.leftSideMenuToggle = this.rootDiv.querySelector("#left_side_menu_toggle");

            this.leftSideMenuToggle?.addEventListener("click", this.leftSideMenu.toggleShow.bind(this.leftSideMenu, "flex"))
        } else {
            throw new Error("rootDiv is required!");
        }
    }
}