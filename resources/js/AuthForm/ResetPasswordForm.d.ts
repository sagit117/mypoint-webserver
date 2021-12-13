import Api from "../common/Api.js";
import Validator from "../common/Validator.js";
import Toasts from "../components/Toasts.js";
import AuthForm from "./AuthForm.js";
export default class ResetPasswordForm extends AuthForm {
    private password;
    private confirmPassword;
    private btnEnter;
    constructor(id: string, validator: Validator, api: Api, toasts: Toasts);
    protected btnOkClick(): void;
    private btnEnterClick;
    private onInputPasswordHandler;
    private onInputConfirmPasswordHandler;
}
