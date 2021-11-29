import { IInputEventChanged } from "../components/Input.js";
import Validator from "../common/Validator.js";
import Api from "../common/Api.js";
export default class LoginForm {
    private rootDiv;
    private login;
    private password;
    private btnOk;
    private btnForgot;
    private validator;
    private spinner;
    private api;
    constructor(id: string, validator: Validator, api: Api);
    /** Вход */
    btnOkClick(): void;
    btnForgotClick(): void;
    onInputLoginHandler(_event: IInputEventChanged): void;
    onInputPasswordHandler(_event: IInputEventChanged): void;
}
