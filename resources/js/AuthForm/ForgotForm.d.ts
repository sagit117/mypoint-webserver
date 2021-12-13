import { IInputEventChanged } from "../components/Input.js";
import Api from "../common/Api.js";
import Validator from "../common/Validator.js";
import Toasts from "../components/Toasts.js";
import AuthForm from "./AuthForm.js";
export default class ForgotForm extends AuthForm {
    private btnEnter;
    constructor(id: string, validator: Validator, api: Api, toasts: Toasts);
    btnOkClick(): void;
    private btnEnterClick;
    protected onInputLoginHandler(_event: IInputEventChanged): void;
}
