import Input from "../components/Input.js";
import Button from "../components/Button.js";
import Spinner from "../components/spinner.js";
import { ToastType } from "../components/Toasts.js";
export default class LoginForm {
    rootDiv = null;
    login = null;
    password = null;
    btnOk = null;
    btnForgot = null;
    validator = null;
    spinner = null;
    api = null;
    toasts = null;
    constructor(id, validator, api, toasts) {
        this.rootDiv = document.getElementById(id);
        this.validator = validator;
        this.api = api;
        this.toasts = toasts;
        if (this.rootDiv) {
            this.login = new Input(this.rootDiv, "login", this.onInputLoginHandler.bind(this));
            this.password = new Input(this.rootDiv, "password", this.onInputPasswordHandler.bind(this));
            this.btnOk = new Button(this.rootDiv, "btnOk", this.btnOkClick.bind(this));
            this.btnForgot = new Button(this.rootDiv, "btnForgot", this.btnForgotClick.bind(this));
            this.spinner = new Spinner(this.rootDiv, "spinner");
        }
        else {
            throw new Error("rootDiv is required!");
        }
        if (!this.validator) {
            throw new Error("validator is required!");
        }
        if (!this.api) {
            throw new Error("API is required!");
        }
    }
    /** Вход */
    btnOkClick() {
        /** проверка логина */
        if (this.login && this.validator?.isEmail(this.login.value)) {
            this.login.setValid("");
        }
        else {
            if (this.login) {
                this.login.setInValid("email не соответствует!");
            }
            return;
        }
        /** проверка пароля */
        if (this.password && this.validator?.notEmpty(this.password.value)) {
            this.password.setValid("");
        }
        else {
            if (this.password) {
                this.password.setInValid("Пароль не должен быть пустым!");
            }
            return;
        }
        this.btnOk?.disable();
        this.btnForgot?.disable();
        this.spinner?.show();
        /** запрос к серверу */
        this.api?.login({
            email: this.login.value,
            password: this.password.value
        })
            .then(res => {
            console.log(res);
        })
            .catch((err) => {
            this.btnOk?.enable();
            this.btnForgot?.enable();
            this.login?.setInValid("");
            this.password?.setInValid("");
            if ("code" in err) {
                switch (err?.code) {
                    case 503:
                        this.toasts?.show("Ошибка подключения", "Сервис не доступен", ToastType.ERROR);
                        break;
                    default:
                        this.toasts?.show("Ошибка", err?.status, ToastType.ERROR);
                        break;
                }
            }
            else {
                this.toasts?.show("Ошибка", err?.message, ToastType.ERROR);
            }
        })
            .finally(() => {
            this.spinner?.hide();
        });
    }
    btnForgotClick() {
        console.log('forgot');
    }
    onInputLoginHandler(_event) {
        this.login?.unsetValidate();
        console.log(this.login?.value);
    }
    onInputPasswordHandler(_event) {
        this.password?.unsetValidate();
        console.log(this.password?.value);
    }
}
