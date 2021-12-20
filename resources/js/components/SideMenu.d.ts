export default class SideMenu implements ISideMenu {
    private rootDiv;
    private isShow;
    private btnClose;
    constructor(id: string);
    toggleShow(): void;
    /** Сопоставляем url с href в сылках */
    private activeLink;
}
export interface ISideMenu {
    toggleShow(): void;
}
