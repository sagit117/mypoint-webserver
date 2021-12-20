export default class SideMenu {
    private rootDiv: HTMLDivElement | null = null;
    private isShow = false;
    private btnClose: HTMLDivElement | null = null;

    constructor(id: string) {
        this.rootDiv = document.getElementById(id) as HTMLDivElement;

        if (this.rootDiv) {
            this.btnClose = this.rootDiv.querySelector("#close");
            this.btnClose?.addEventListener("click", this.toggleShow.bind(this));
        } else {
            throw new Error("rootDiv is required!");
        }
    }

    public toggleShow() {
        if (!this.rootDiv) return;

        if (this.isShow) {
            this.rootDiv.style.display = "none";
        } else {
            this.rootDiv.style.display = "flex";
        }

        this.isShow = !this.isShow;
    }
}