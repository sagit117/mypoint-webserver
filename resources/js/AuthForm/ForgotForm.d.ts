import { IInputEventChanged } from "../components/Input.js";
import { IApi } from "../common/Api.js";
import { IValidator } from "../common/Validator.js";
import { IToasts } from "../components/Toasts.js";
import AuthForm from "./AuthForm.js";
/**
 * Класс для управления формой "Забыли пароль"
 */
export default class ForgotForm extends AuthForm {
    private btnEnter;
    constructor(id: string, validator: IValidator, api: IApi, toasts: IToasts);
    /**
     * Обработчик кнопки отправить запрос
     * @returns
     */
    btnOkClick(): void;
    private btnEnterClick;
    protected onInputLoginHandler(_event: IInputEventChanged): void;
}
