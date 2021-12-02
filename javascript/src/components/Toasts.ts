export default class Toasts implements IToasts {
    private divRoot: HTMLDivElement | null = null;

    constructor(id: string) {
        this.divRoot = document.getElementById(id) as HTMLDivElement;

        if (!this.divRoot) {
            new Error("DivRoot is required!")
        }
    }

    show(title: string, message: string, type: ToastType): void {
        const toast = new Toast(title, message, type).createHTML();
        this.divRoot?.insertAdjacentElement("beforeend", toast);
    }
}

class Toast {
    private title: string;
    private message: string;
    private type: ToastType;
    private timeToLifeMC: number = 3000;
    private toast: HTMLDivElement | null = null;
    private timer: NodeJS.Timeout | null = null;

    constructor(title: string, message: string, type: ToastType, timeToLifeMC: number = 3000) {
        this.title = title;
        this.message = message;
        this.type = type;
        this.timeToLifeMC = timeToLifeMC;
    }
    
    public createHTML(): HTMLDivElement {
        const div = document.createElement("div")
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
        date.innerHTML = `<small>${new Date().toLocaleDateString()}</small>`;

        const btnClose = document.createElement("div");
        btnClose.classList.add("toast_header__close");
        btnClose.innerHTML = "&#10006;";
        btnClose.addEventListener("click", this.remove.bind(this));

        header.insertAdjacentElement("afterbegin", img);
        header.insertAdjacentElement("beforeend", title);
        header.insertAdjacentElement("beforeend", date);
        header.insertAdjacentElement("beforeend", btnClose);

        const body = document.createElement("div")
        body.classList.add("toast_body");
        body.textContent = this.message || "";

        div.insertAdjacentElement("afterbegin", header);
        div.insertAdjacentElement("beforeend", body)

        this.toast = div
        this.setTimeToRemove(this.timeToLifeMC)

        return this.toast
    }

    private setTimeToRemove(timeToLifeMC: number) {
        this.timer = setTimeout(() => {
            this.timer = null;
            this.remove();
        }, timeToLifeMC)
    }

    private remove() {
        if (this.timer) clearTimeout(this.timer);
        this.toast?.remove();
    }
}

interface IToasts {
    show: (title: string, message: string, type: ToastType) => void;
}

export enum ToastType {
    WARNING = "warning",
    SUCCESS = "success",
    ERROR = "error"
}