/** Класс для управления side menu */
export default class SideMenu {
    rootDiv = null;
    isShow = false;
    btnClose = null;
    items = [];
    constructor(id) {
        this.rootDiv = document.getElementById(id);
        if (this.rootDiv) {
            this.btnClose = this.rootDiv.querySelector("#close");
            this.btnClose?.addEventListener("click", this.toggleShow.bind(this));
            if (!this.isShow)
                this.rootDiv.style.display = "none";
            this.activeLink()?.classList.add("active-link");
            this.getItems();
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
    /** Сопоставляем url с href в сылках */
    activeLink() {
        const location = document.location.pathname;
        const links = this.rootDiv?.querySelectorAll("a");
        let activeItem = null;
        links?.forEach(item => {
            if (item.href.endsWith(location)) {
                activeItem = item;
            }
        });
        return activeItem;
    }
    getItems() {
        const toggle = this.rootDiv?.querySelectorAll(".side_menu__items__toggle");
        toggle?.forEach(item => {
            this.items.push(new SideMenuItem(item.parentElement, item));
        });
    }
}
/** Класс отвечает за пункты меню и отображение групп меню */
class SideMenuItem {
    rootDiv = null;
    toogle = null;
    divSubItems = null;
    isShow = false;
    constructor(div, toogle) {
        this.rootDiv = div;
        this.toogle = toogle;
        if (this.rootDiv) {
            this.divSubItems = this.rootDiv.querySelector(".side_menu__sub_item");
            this.toogle.addEventListener("click", this.toogleShow.bind(this));
            if (!this.isShow && this.divSubItems)
                this.divSubItems.style.display = "none";
        }
        else {
            throw new Error("rootDiv is required!");
        }
    }
    toogleShow() {
        if (!this.divSubItems || !this.toogle)
            return;
        if (!this.isShow) {
            this.divSubItems.style.display = "block";
            this.toogle.style.transform = "rotate(90deg)";
        }
        else {
            this.divSubItems.style.display = "none";
            this.toogle.style.transform = "rotate(0deg)";
        }
        this.isShow = !this.isShow;
    }
}
