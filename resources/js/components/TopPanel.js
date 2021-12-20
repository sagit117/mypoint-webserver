export default class TopPanel {
    rootDiv = null;
    leftSideMenu = null;
    leftSideMenuToggle = null;
    constructor(id, leftSideMenu) {
        this.rootDiv = document.getElementById(id);
        if (this.rootDiv) {
            this.leftSideMenu = leftSideMenu;
            this.leftSideMenuToggle = this.rootDiv.querySelector("#left_side_menu_toggle");
            this.leftSideMenuToggle?.addEventListener("click", this.leftSideMenu.toggleShow.bind(this.leftSideMenu));
        }
        else {
            throw new Error("rootDiv is required!");
        }
    }
}
