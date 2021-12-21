/** Класс для управления side menu */
export default class SideMenu implements ISideMenu {
    private rootDiv;
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
