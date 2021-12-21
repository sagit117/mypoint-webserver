import DefaultHTMLElement from "../common/DefaultHTMLComponent.js";
/** Класс для управления side menu */
export default class SideMenu extends DefaultHTMLElement implements ISideMenu {
    private isShow;
    private btnClose;
    private items;
    constructor(id: string);
    toggleShow(): void;
    /** Сопоставляем url с href в сылках */
    private activeLink;
    private getItems;
}
export interface ISideMenu {
    toggleShow(): void;
}
