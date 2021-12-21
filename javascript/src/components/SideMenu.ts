import DefaultHTMLElement from "../common/DefaultHTMLComponent.js";

/** Класс для управления side menu */
export default class SideMenu extends DefaultHTMLElement implements ISideMenu {
    private isShow = false;
    private btnClose: HTMLDivElement | null = null;
    private items: Array<SideMenuItem> = [];

    constructor(id: string) {
        super(id);

        if (this.rootDiv) {
            this.btnClose = this.rootDiv.querySelector("#close");
            this.btnClose?.addEventListener("click", this.toggleShow.bind(this));

            if (!this.isShow) this.rootDiv.style.display = "none";

            this.activeLink()?.classList.add("active-link");
            this.getItems();
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

    private getItems() {
        const toggle = this.rootDiv?.querySelectorAll(".side_menu__items__toggle");

        toggle?.forEach(item => {
            this.items.push(new SideMenuItem(item.parentElement as HTMLDivElement, item as HTMLDivElement));
        });
    }
}

/** Класс отвечает за пункты меню и отображение групп меню */
class SideMenuItem extends DefaultHTMLElement {
    private toogle: HTMLDivElement | null = null;
    private divSubItems: HTMLDivElement | null = null;
    private isShow = false;

    constructor(div: HTMLDivElement, toogle: HTMLDivElement) {
        super(div);
        this.toogle = toogle;

        if (this.rootDiv) {
            this.divSubItems = this.rootDiv.querySelector(".side_menu__sub_item");

            this.toogle.addEventListener("click", this.toogleShow.bind(this));
            
            if (!this.isShow && this.divSubItems) this.divSubItems.style.display = "none";
        }
    }

    private toogleShow() {
        if (!this.divSubItems || !this.toogle) return;

        if (!this.isShow) {
            this.divSubItems.style.display = "block";
            this.toogle.style.transform = "rotate(90deg)";
        } else {
            this.divSubItems.style.display = "none";
            this.toogle.style.transform = "rotate(0deg)";
        }

        this.isShow = !this.isShow;
    }
}

export interface ISideMenu {
    toggleShow(): void
}