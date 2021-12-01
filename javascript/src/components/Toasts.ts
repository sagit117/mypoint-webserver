export default class Toasts implements IToasts {
    private divRoot: HTMLDivElement | null = null;

    constructor(id: string) {
        this.divRoot = document.getElementById(id) as HTMLDivElement;

        if (!this.divRoot) {
            new Error("DivRoot is required!")
        }
    }

    show(title: string, message: string, type: ToastType): void {
        new Toast(title, message, type)
        console.log("show", title, message, type)
    }
}

class Toast {
    constructor(title: string, message: string, type: ToastType, timeToLifeMC: number = 3000) {

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