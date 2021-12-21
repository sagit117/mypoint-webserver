import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
export default class TopPanel extends DefaultHTMLComponent {
    leftSideMenu = null;
    leftSideMenuToggle = null;
    constructor(id, leftSideMenu) {
        super(id);
        if (this.rootDiv) {
            this.leftSideMenu = leftSideMenu;
            this.leftSideMenuToggle = this.rootDiv.querySelector("#left_side_menu_toggle");
            this.leftSideMenuToggle?.addEventListener("click", this.leftSideMenu.toggleShow.bind(this.leftSideMenu, "flex"));
        }
        else {
            throw new Error("rootDiv is required!");
        }
    }
}
