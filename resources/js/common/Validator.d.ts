/** Класс для валидации введенных значений */
export default class Validator implements IValidator {
    constructor();
    /**
     * Проверка на корректность email
     * @param value - email
     * @returns
     */
    isEmail(value?: string): boolean;
    /**
     * Проверка на не пустое значение
     * @param value - значение
     * @returns
     */
    notEmpty(value?: TValue): boolean;
    /**
     * Сравнение двух значений (простые типы)
     * @param valueFirst - значение 1
     * @param valueSecond - значение 2
     * @returns
     */
    isEqual(valueFirst?: TValue, valueSecond?: TValue): boolean;
}
export interface IValidator {
    isEmail(value?: string): boolean;
    notEmpty(value?: string): boolean;
    isEqual(valueFirst: TValue, valueSecond: TValue): boolean;
}
declare type TValue = string | number | boolean;
export {};
