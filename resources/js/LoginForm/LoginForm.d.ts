import { IInputEventChanged } from "../components/Input.js";
import Validator from "../common/Validator.js";
export default class LoginForm {
    private rootDiv;
    private login;
    private password;
    private btnOk;
    private btnForgot;
    private validator;
    constructor(id: string, validator: Validator);
    /** Вход */
    btnOkClick(): void;
    btnForgotClick(): void;
    onInputLoginHandler(_event: IInputEventChanged): void;
    onInputPasswordHandler(_event: IInputEventChanged): void;
}
