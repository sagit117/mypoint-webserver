import { IApi } from "../common/Api.js";
import { IValidator } from "../common/Validator.js";
import { IToasts } from "../components/Toasts.js";
import AuthForm from "./AuthForm.js";
export default class ResetPasswordForm extends AuthForm {
    private password;
    private confirmPassword;
    private btnEnter;
    constructor(id: string, validator: IValidator, api: IApi, toasts: IToasts);
    protected btnOkClick(): void;
    private btnEnterClick;
    private onInputPasswordHandler;
    private onInputConfirmPasswordHandler;
}
