import DefaultHTMLElement from "../common/DefaultHTMLComponent.js";
/** Класс для управления side menu */
export default class SideMenu extends DefaultHTMLElement implements ISideMenu {
    private btnClose;
    private items;
    constructor(id: string);
    /** Сопоставляем url с href в сылках */
    private activeLink;
    /** Получение массива подменю, для обработки кнопок развернуть/свернуть */
    private getItems;
}
export interface ISideMenu {
    toggleShow(): void;
}
