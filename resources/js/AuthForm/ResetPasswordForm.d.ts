import Api from "../common/Api.js";
import Validator from "../common/Validator.js";
import Toasts from "../components/Toasts.js";
import { IInputEventChanged } from "../components/Input.js";
import AuthForm from "./AuthForm.js";
export default class ResetPasswordForm extends AuthForm {
    private password;
    private confirmPassword;
    constructor(id: string, validator: Validator, api: Api, toasts: Toasts);
    onInputPasswordHandler(_event: IInputEventChanged): void;
    onInputConfirmPasswordHandler(_event: IInputEventChanged): void;
}
