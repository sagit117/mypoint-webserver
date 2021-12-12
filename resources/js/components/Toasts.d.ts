export default class Toasts implements IToasts {
    private divRoot;
    constructor(id: string);
    show(title: string, message: string, type: ToastType, cbOnClose?: () => void): void;
}
interface IToasts {
    show: (title: string, message: string, type: ToastType) => void;
}
export declare enum ToastType {
    WARNING = "warning",
    SUCCESS = "success",
    ERROR = "error"
}
export {};
