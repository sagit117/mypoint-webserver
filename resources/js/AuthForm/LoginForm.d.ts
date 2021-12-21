import { IInputEventChanged } from "../components/Input.js";
import { IToasts } from "../components/Toasts.js";
import { IValidator } from "../common/Validator.js";
import { IApi } from "../common/Api.js";
import AuthForm from "./AuthForm.js";
/**
 * Класс управления формой авторизации
 */
export default class LoginForm extends AuthForm {
    private password;
    private btnForgot;
    constructor(id: string, validator: IValidator, api: IApi, toasts: IToasts);
    /** Обработчик кнопки вход */
    protected btnOkClick(): void;
    private btnForgotClick;
    protected onInputLoginHandler(_event: IInputEventChanged): void;
    private onInputPasswordHandler;
}
