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
            
            /** Формирование массива данных */
            let idx = 0;
            this.cells.forEach(cell => {
                const key = cell.dataset["headerName"];
                if (!key) return;

                /** Если массив пустой, добавляем объект */
                if (!this.rows.length) {
                    this.rows.push(
                        new Proxy({} as ITarget, {
                            set: setWithProxy(idx)
                        })
                    );
                }

                /** Если в объекте уже есть свойство, тогда добавляем новый объект */
                if (this.rows[idx]?.hasOwnProperty(key)) {
                    idx++;
                    
                    this.rows.push(
                        new Proxy({
                            [key]: cell.innerHTML
                        } as ITarget, {
                            set: setWithProxy(idx)
                        })
                    );
                } else { 
                    /** Иначе записываем свойство в объект */
                    Object.assign(this.rows[idx], { [key]: cell.innerHTML });
                }

                /** Сохраняем индекс строки в ячейки таблицы */
                cell.dataset["rowIndex"] = idx.toString();
            })
        }
    }

    /** Установить значение ячейки */
    protected setCell(rowIndex: number, headerName: string, valueHTML: string) {
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