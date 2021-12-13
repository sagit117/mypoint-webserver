import Api from "../common/Api.js";
import Validator from "../common/Validator.js";
import Toasts from "../components/Toasts.js";
import Input, { IInputEventChanged } from "../components/Input.js";
import AuthForm from "./AuthForm.js";
import Button from "../components/Button.js";

export default class ResetPasswordForm extends AuthForm {
    private password: Input | null = null;
    private confirmPassword: Input | null = null;
    private btnEnter: Button | null = null;

    constructor(id: string, validator: Validator, api: Api, toasts: Toasts) {
        super(id, validator, api, toasts);

        if (this.rootDiv) {
            this.password = new Input(this.rootDiv, "password", this.onInputPasswordHandler.bind(this));
            this.confirmPassword = new Input(this.rootDiv, "confirm", this.onInputConfirmPasswordHandler.bind(this));

            this.password.getTarget()?.addEventListener("keydown", (e: KeyboardEvent) => {
                if (e.key == "Enter") {
                    this.btnOkClick()
                }
            })
            this.confirmPassword.getTarget()?.addEventListener("keydown", (e: KeyboardEvent) => {
                if (e.key == "Enter") {
                    this.btnOkClick()
                }
            })

            this.btnEnter = new Button(this.rootDiv, "btnEnter", this.btnEnterClick.bind(this));
        }
    }

    protected btnOkClick() {

    }

    private btnEnterClick() {
        location.replace("/admin/panel/login");
    }

    private onInputPasswordHandler(_event: IInputEventChanged) {
        this.password?.unsetValidate();
    }

    private onInputConfirmPasswordHandler(_event: IInputEventChanged) {
        this.confirmPassword?.unsetValidate();
    }
}