export default class SideMenu implements ISideMenu {
    private rootDiv: HTMLDivElement | null = null;
    private isShow = false;
    private btnClose: HTMLDivElement | null = null;

    constructor(id: string) {
        this.rootDiv = document.getElementById(id) as HTMLDivElement;

        if (this.rootDiv) {
            this.btnClose = this.rootDiv.querySelector("#close");
            this.btnClose?.addEventListener("click", this.toggleShow.bind(this));

            this.activeLink()?.classList.add("active-link");
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

    /** Сопоставляем url с href в сылках */
    private activeLink(): HTMLAnchorElement | null {
        const location = document.location.pathname;
        const links = this.rootDiv?.querySelectorAll("a");
        let activeItem = null;

        links?.forEach(item => {
            if (item.href.endsWith(location)) {
                activeItem = item;
            }
        })

        return activeItem;
    }
}

export interface ISideMenu {
    toggleShow(): void
}