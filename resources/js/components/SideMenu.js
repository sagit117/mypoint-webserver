export default class SideMenu {
    rootDiv = null;
    isShow = false;
    btnClose = null;
    constructor(id) {
        this.rootDiv = document.getElementById(id);
        if (this.rootDiv) {
            this.btnClose = this.rootDiv.querySelector("#close");
            this.btnClose?.addEventListener("click", this.toggleShow.bind(this));
        }
        else {
            throw new Error("rootDiv is required!");
        }
    }
    toggleShow() {
        if (!this.rootDiv)
            return;
        if (this.isShow) {
            this.rootDiv.style.display = "none";
        }
        else {
            this.rootDiv.style.display = "flex";
        }
        this.isShow = !this.isShow;
    }
}
