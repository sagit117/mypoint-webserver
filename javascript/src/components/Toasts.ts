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
        header.classList.add("toast_header")

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
        setTimeout(() => {
            this.remove()
        }, timeToLifeMC)
    }

    private remove() {
        this.toast?.remove()
    }
}

interface IToasts {
    show: (title: string, message: string, type: ToastType) => void;
}

export enum ToastType {
    WARNING,
    SUCCESS,
    ERROR
}