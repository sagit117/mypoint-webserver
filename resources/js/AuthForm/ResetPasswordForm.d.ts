import { IApi } from "../common/Api.js";
import { IValidator } from "../common/Validator.js";
import { IToasts } from "../components/Toasts.js";
import AuthForm from "./AuthForm.js";
/**
 * Класс для управления формой ввода нового пароля, применяется к восстановлению пароля из почты
 */
export default class ResetPasswordForm extends AuthForm {
    private password;
    private confirmPassword;
    private btnEnter;
    constructor(id: string, validator: IValidator, api: IApi, toasts: IToasts);
    /** Обработчки кнопки смены пароля */
    protected btnOkClick(): void;
    private btnEnterClick;
    private onInputPasswordHandler;
    private onInputConfirmPasswordHandler;
}
