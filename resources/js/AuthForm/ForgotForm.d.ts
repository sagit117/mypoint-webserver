import { IInputEventChanged } from "../components/Input.js";
import { IApi } from "../common/Api.js";
import { IValidator } from "../common/Validator.js";
import { IToasts } from "../components/Toasts.js";
import AuthForm from "./AuthForm.js";
export default class ForgotForm extends AuthForm {
    private btnEnter;
    constructor(id: string, validator: IValidator, api: IApi, toasts: IToasts);
    btnOkClick(): void;
    private btnEnterClick;
    protected onInputLoginHandler(_event: IInputEventChanged): void;
}
