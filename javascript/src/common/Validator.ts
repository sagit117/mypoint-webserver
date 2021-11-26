export default class Validator implements IValidator {
    constructor() {}

    public isEmail(value?: string): boolean {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
        return reg.test(value || "");
    }

    public notEmpty(value?: string): boolean {
        return !!value
    }
}

interface IValidator {
    isEmail(value?: string): boolean
    notEmpty(value?: string): boolean
}