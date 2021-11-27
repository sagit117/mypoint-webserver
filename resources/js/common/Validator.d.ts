export default class Validator implements IValidator {
    constructor();
    isEmail(value?: string): boolean;
    notEmpty(value?: string): boolean;
}
interface IValidator {
    isEmail(value?: string): boolean;
    notEmpty(value?: string): boolean;
}
export {};
