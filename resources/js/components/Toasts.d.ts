export default class Toasts implements IToasts {
    private divRoot;
    constructor(id: string);
    show(title: string, message: string, type: ToastType): void;
}
interface IToasts {
    show: (title: string, message: string, type: ToastType) => void;
}
export declare enum ToastType {
    WARNING = 0,
    SUCCESS = 1,
    ERROR = 2
}
export {};
