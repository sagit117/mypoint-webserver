import Input from "../components/Input.js";
import Button from "../components/Button.js";
export default class LoginForm {
    rootDiv = null;
    login = null;
    password = null;
    btnOk = null;
    btnForgot = null;
    validator = null;
    constructor(id, validator) {
        this.rootDiv = document.querySelector("#" + id);
        this.validator = validator;
        if (this.rootDiv) {
            this.login = new Input(this.rootDiv, "login", this.onInputLoginHandler.bind(this));
            this.password = new Input(this.rootDiv, "password", this.onInputPasswordHandler.bind(this));
            this.btnOk = new Button(this.rootDiv, "btnOk", this.btnOkClick.bind(this));
            this.btnForgot = new Button(this.rootDiv, "btnForgot", this.btnForgotClick.bind(this));
        }
        else {
            throw new Error("rootDiv is required!");
        }
        if (!this.validator) {
            throw new Error("validator is required!");
        }
    }
    /** Вход */
    btnOkClick() {
        /** ошибка логина */
        if (this.login && this.validator?.isEmail(this.login.value)) {
            this.login.isInValid = false;
            this.login.isValid = true;
        }
        else {
            if (this.login) {
                this.login.isInValid = true;
                this.login.isValid = false;
            }
            return;
        }
        /** ошибка пароля */
        if (this.password && this.validator?.notEmpty(this.password.value)) {
            this.password.isInValid = false;
            this.password.isValid = true;
        }
        else {
            if (this.password) {
                this.password.isInValid = true;
                this.password.isValid = false;
            }
            return;
        }
        this.btnOk?.disable();
        this.btnForgot?.disable();
    }
    btnForgotClick() {
        console.log('forgot');
    }
    onInputLoginHandler(_event) {
        console.log(this.login?.value);
    }
    onInputPasswordHandler(_event) {
        console.log(this.password?.value);
    }
}
