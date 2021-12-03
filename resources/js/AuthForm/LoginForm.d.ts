import { IInputEventChanged } from "../components/Input.js";
import Toasts from "../components/Toasts.js";
import Validator from "../common/Validator.js";
import Api from "../common/Api.js";
import AuthForm from "./AuthForm.js";
export default class LoginForm extends AuthForm {
    private password;
    private btnForgot;
    constructor(id: string, validator: Validator, api: Api, toasts: Toasts);
    /** Вход */
    btnOkClick(): void;
    btnForgotClick(): void;
    onInputLoginHandler(_event: IInputEventChanged): void;
    onInputPasswordHandler(_event: IInputEventChanged): void;
}
