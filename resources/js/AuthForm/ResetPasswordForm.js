import Input from "../components/Input.js";
import AuthForm from "./AuthForm.js";
export default class ResetPasswordForm extends AuthForm {
    password = null;
    confirmPassword = null;
    constructor(id, validator, api, toasts) {
        super(id, validator, api, toasts);
        if (this.rootDiv) {
            this.password = new Input(this.rootDiv, "password", this.onInputPasswordHandler.bind(this));
            this.confirmPassword = new Input(this.rootDiv, "confirm", this.onInputConfirmPasswordHandler.bind(this));
            this.password.getTarget()?.addEventListener("keydown", (e) => {
                if (e.key == "Enter") {
                    this.btnOkClick();
                }
            });
            this.confirmPassword.getTarget()?.addEventListener("keydown", (e) => {
                if (e.key == "Enter") {
                    this.btnOkClick();
                }
            });
        }
    }
    onInputPasswordHandler(_event) {
        this.password?.unsetValidate();
    }
    onInputConfirmPasswordHandler(_event) {
        this.confirmPassword?.unsetValidate();
    }
}
