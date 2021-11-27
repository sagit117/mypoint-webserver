import Input, { IInputEventChanged } from "../components/Input.js"
import Button from "../components/Button.js"
import Validator from "../common/Validator.js"

export default class LoginForm {
    private rootDiv: HTMLDivElement | null = null;
    private login: Input | null = null;
    private password: Input | null = null;
    private btnOk: Button | null = null;
    private btnForgot: Button | null = null;
    private validator: Validator | null = null;

    constructor(id: string, validator: Validator) {
        this.rootDiv = document.querySelector("#" + id) as HTMLDivElement;
        this.validator = validator;

        if (this.rootDiv) {
            this.login = new Input(this.rootDiv, "login", this.onInputLoginHandler.bind(this));
            this.password = new Input(this.rootDiv, "password", this.onInputPasswordHandler.bind(this));

            this.btnOk = new Button(this.rootDiv, "btnOk", this.btnOkClick.bind(this));
            this.btnForgot = new Button(this.rootDiv, "btnForgot", this.btnForgotClick.bind(this));
        } else {
            throw new Error("rootDiv is required!")
        }

        if (!this.validator) {
            throw new Error("validator is required!")
        }
    }

    /** Вход */
    public btnOkClick() {
        /** ошибка логина */
        if (this.login && this.validator?.isEmail(this.login.value)) {
            this.login.isInValid = false
            this.login.isValid = true;
        } else {
            if (this.login) {
                this.login.isInValid = true;
                this.login.isValid = false;
            }

            return;
        }

        /** ошибка пароля */
        if (this.password && this.validator?.notEmpty(this.password.value)) {
            this.password.isInValid = false
            this.password.isValid = true;
        } else {
            if (this.password) {
                this.password.isInValid = true;
                this.password.isValid = false;
            }

            return;
        }

        this.btnOk?.disable()
        this.btnForgot?.disable()
    }

    public btnForgotClick() {
        console.log('forgot')
    }

    public onInputLoginHandler(_event: IInputEventChanged) {
        console.log(this.login?.value)
    }

    public onInputPasswordHandler(_event: IInputEventChanged) {
        console.log(this.password?.value)
    }
}