export default class Toasts {
    divRoot = null;
    constructor(id) {
        this.divRoot = document.getElementById(id);
        if (!this.divRoot) {
            new Error("DivRoot is required!");
        }
    }
    show(title, message, type) {
        const toast = new Toast(title, message, type).createHTML();
        this.divRoot?.insertAdjacentElement("beforeend", toast);
    }
}
class Toast {
    title;
    message;
    type;
    timeToLifeMC = 3000;
    toast = null;
    constructor(title, message, type, timeToLifeMC = 3000) {
        this.title = title;
        this.message = message;
        this.type = type;
        this.timeToLifeMC = timeToLifeMC;
    }
    createHTML() {
        const div = document.createElement("div");
        div.classList.add("toast");
        const header = document.createElement("div");
        header.classList.add("toast_header");
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
        setTimeout(() => {
            this.remove();
        }, timeToLifeMC);
    }
    remove() {
        this.toast?.remove();
    }
}
export var ToastType;
(function (ToastType) {
    ToastType[ToastType["WARNING"] = 0] = "WARNING";
    ToastType[ToastType["SUCCESS"] = 1] = "SUCCESS";
    ToastType[ToastType["ERROR"] = 2] = "ERROR";
})(ToastType || (ToastType = {}));
