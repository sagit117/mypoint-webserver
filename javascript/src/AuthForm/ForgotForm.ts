import { IInputEventChanged } from "../components/Input.js";
import Api from "../common/Api.js";
import Validator from "../common/Validator.js";
import Toasts from "../components/Toasts.js";
import AuthForm from "./AuthForm.js";
import Button from "../components/Button.js";

export default class ForgotForm extends AuthForm {
    private btnEnter: Button | null = null;

    constructor(id: string, validator: Validator, api: Api, toasts: Toasts) {
        super(id, validator, api, toasts);

        if (this.rootDiv) {
            this.btnEnter = new Button(this.rootDiv, "btnEnter", this.btnEnterClick.bind(this));
        }
    }

    public btnOkClick() {
        
    }

    public btnEnterClick() {
        location.replace("/admin/panel/login");
    }

    public onInputLoginHandler(_event: IInputEventChanged) {
        this.login?.unsetValidate();
    }
}