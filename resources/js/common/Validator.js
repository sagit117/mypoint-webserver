/** Класс для валидации введенных значений */
export default class Validator {
    constructor() { }
    /**
     * Проверка на корректность email
     * @param value - email
     * @returns
     */
    isEmail(value) {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
        return reg.test(value || "");
    }
    /**
     * Проверка на не пустое значение
     * @param value - значение
     * @returns
     */
    notEmpty(value) {
        return !!value;
    }
    /**
     * Сравнение двух значений (простые типы)
     * @param valueFirst - значение 1
     * @param valueSecond - значение 2
     * @returns
     */
    isEqual(valueFirst, valueSecond) {
        return valueFirst === valueSecond;
    }
}
