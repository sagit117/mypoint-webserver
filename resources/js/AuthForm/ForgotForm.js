import AuthForm from "./AuthForm.js";
import Button from "../components/Button.js";
export default class ForgotForm extends AuthForm {
    btnEnter = null;
    constructor(id, validator, api, toasts) {
        super(id, validator, api, toasts);
        if (this.rootDiv) {
            this.btnEnter = new Button(this.rootDiv, "btnEnter", this.btnEnterClick.bind(this));
        }
    }
    btnOkClick() {
    }
    btnEnterClick() {
        location.replace("/admin/panel/login");
    }
    onInputLoginHandler(_event) {
        this.login?.unsetValidate();
    }
}
