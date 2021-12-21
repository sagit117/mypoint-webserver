import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
export default class Toasts extends DefaultHTMLComponent {
    constructor(id) {
        super(id);
    }
    show(title, message, type, cbOnClose) {
        const toast = new Toast(title, message, type, cbOnClose).createHTML();
        this.rootDiv?.insertAdjacentElement("beforeend", toast);
    }
}
class Toast {
    title;
    message;
    type;
    timeToLifeMC = 3000;
    toast = null;
    timer = null;
    cbOnClose;
    constructor(title, message, type, cbOnClose, timeToLifeMC = 3000) {
        this.title = title;
        this.message = message;
        this.type = type;
        this.timeToLifeMC = timeToLifeMC;
        if (cbOnClose && typeof cbOnClose == "function")
            this.cbOnClose = cbOnClose;
    }
    createHTML() {
        const div = document.createElement("div");
        div.classList.add("toast");
        const header = document.createElement("div");
        header.classList.add("toast_header");
        const img = document.createElement("image");
        img.classList.add("toast_header__img");
        img.classList.add(this.type.toLowerCase());
        img.classList.add("mr-1");
        const title = document.createElement("div");
        title.classList.add("toast_header__title");
        title.classList.add("mr-1");
        title.innerHTML = `<strong>${this.title}</strong>`;
        const date = document.createElement("div");
        date.classList.add("toast_header__date");
        date.classList.add("mr-1");
        date.innerHTML = `<small>${new Date().toLocaleTimeString()}</small>`;
        const btnClose = document.createElement("div");
        btnClose.classList.add("toast_header__close");
        btnClose.innerHTML = "&#10006;";
        btnClose.addEventListener("click", this.remove.bind(this));
        header.insertAdjacentElement("afterbegin", img);
        header.insertAdjacentElement("beforeend", title);
        header.insertAdjacentElement("beforeend", date);
        header.insertAdjacentElement("beforeend", btnClose);
        const body = document.createElement("div");
        body.classList.add("toast_body");
        body.textContent = this.message || "";
        div.insertAdjacentElement("afterbegin", header);
        div.insertAdjacentElement("beforeend", body);
        this.toast = div;
        this.setTimeToRemove(this.timeToLifeMC);
        return this.toast;
    }
    setTimeToRemove(timeToLifeMC) {
        this.timer = setTimeout(() => {
            this.timer = null;
            this.remove();
        }, timeToLifeMC);
    }
    remove() {
        if (this.timer)
            clearTimeout(this.timer);
        this.toast?.remove();
        if (this.cbOnClose)
            this.cbOnClose();
    }
}
export var ToastType;
(function (ToastType) {
    ToastType["WARNING"] = "warning";
    ToastType["SUCCESS"] = "success";
    ToastType["ERROR"] = "error";
})(ToastType || (ToastType = {}));
