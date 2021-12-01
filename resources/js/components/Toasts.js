export default class Toasts {
    divRoot = null;
    constructor(id) {
        this.divRoot = document.getElementById(id);
        if (!this.divRoot) {
            new Error("DivRoot is required!");
        }
    }
    show(title, message, type) {
        new Toast(title, message, type);
        console.log("show", title, message, type);
    }
}
class Toast {
    constructor(title, message, type, timeToLifeMC = 3000) {
    }
}
export var ToastType;
(function (ToastType) {
    ToastType[ToastType["WARNING"] = 0] = "WARNING";
    ToastType[ToastType["SUCCESS"] = 1] = "SUCCESS";
    ToastType[ToastType["ERROR"] = 2] = "ERROR";
})(ToastType || (ToastType = {}));
