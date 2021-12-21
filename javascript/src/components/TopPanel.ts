import { ISideMenu } from "./SideMenu.js";

export default class TopPanel {
    private rootDiv: HTMLDivElement | null = null;
    private leftSideMenu: ISideMenu | null = null;
    private leftSideMenuToggle: HTMLDivElement | null = null;

    constructor(id: string, leftSideMenu: ISideMenu) {
        this.rootDiv = document.getElementById(id) as HTMLDivElement;
        
        if (this.rootDiv) {
            this.leftSideMenu = leftSideMenu;
            this.leftSideMenuToggle = this.rootDiv.querySelector("#left_side_menu_toggle");

            this.leftSideMenuToggle?.addEventListener("click", this.leftSideMenu.toggleShow.bind(this.leftSideMenu))
        } else {
            throw new Error("rootDiv is required!");
        }
    }
}