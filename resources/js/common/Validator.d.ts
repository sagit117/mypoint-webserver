export default class Validator implements IValidator {
    constructor();
    isEmail(value?: string): boolean;
    notEmpty(value?: TValue): boolean;
    isEqual(valueFirst?: TValue, valueSecond?: TValue): boolean;
}
interface IValidator {
    isEmail(value?: string): boolean;
    notEmpty(value?: string): boolean;
    isEqual(valueFirst: TValue, valueSecond: TValue): boolean;
}
declare type TValue = string | number | boolean;
export {};
