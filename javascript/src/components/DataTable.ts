import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";

export default class DataTable extends DefaultHTMLComponent {
    protected cells: NodeListOf<HTMLDivElement> | undefined;
    protected rows: Array<ITarget> = [];

    constructor(rootDiv: string | null) {
        super(rootDiv);

        if (this.rootDiv) {
            this.cells = this.rootDiv.querySelectorAll<HTMLDivElement>(".table-cell");

            /** Функция set для proxy объектов таблицы */
            const setWithProxy = (idx: number) => {
                return (target: any, prop: string, value: any) => {
                    target[prop] = value;
                    this.setCell(idx, prop, value);

                    return true;
                }
            }
            
            let idx = 0;
            this.cells.forEach(cell => {
                if (!this.rows.length) {
                    this.rows.push(new Proxy({} as ITarget, {
                        set: setWithProxy(idx)
                    }));
                }

                if (this.rows[idx]?.hasOwnProperty(cell.dataset["headerName"] || "")) {
                    idx++;
                    this.rows.push(new Proxy({} as ITarget, {
                        set: setWithProxy(idx)
                    }));
                } else {
                    const key = cell.dataset["headerName"];

                    if (key) Object.assign(this.rows[idx], { [key]: cell.innerHTML });
                }

                cell.dataset["rowIndex"] = idx.toString();
            })
        }
    }

    /** Установить значение ячейки */
    public setCell(rowIndex: number, headerName: string, valueHTML: string) {
        this.cells?.forEach((cell) => {
            if (cell.dataset["rowIndex"] === rowIndex.toString() && cell.dataset["headerName"] === headerName) {
                cell.innerHTML = valueHTML;
            }
        })
    }
}

interface ITarget {
    [key: string]: string
}