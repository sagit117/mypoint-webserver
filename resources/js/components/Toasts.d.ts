import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
/** Класс для управления очередями сообщений в toast */
export default class Toasts extends DefaultHTMLComponent implements IToasts {
    constructor(id: string);
    show(title: string, message: string, type: ToastType, cbOnClose?: () => void): void;
}
export interface IToasts {
    show: (title: string, message: string, type: ToastType, cbOnClose?: () => void) => void;
}
export declare enum ToastType {
    WARNING = "warning",
    SUCCESS = "success",
    ERROR = "error"
}
