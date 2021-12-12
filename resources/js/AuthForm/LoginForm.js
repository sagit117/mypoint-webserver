import Input from "../components/Input.js";
import { ToastType } from "../components/Toasts.js";
import AuthForm from "./AuthForm.js";
import Button from "../components/Button.js";
export default class LoginForm extends AuthForm {
    password = null;
    btnForgot = null;
    constructor(id, validator, api, toasts) {
        super(id, validator, api, toasts);
        if (this.rootDiv) {
            this.password = new Input(this.rootDiv, "password", this.onInputPasswordHandler.bind(this));
            this.btnForgot = new Button(this.rootDiv, "btnForgot", this.btnForgotClick.bind(this));
            this.password.getTarget()?.addEventListener("keydown", (e) => {
                if (e.key == "Enter") {
                    this.btnOkClick();
                }
            });
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
            .then((_res) => {
            location.replace("/admin/panel");
        })
            .catch((err) => {
            this.btnOk?.enable();
            this.btnForgot?.enable();
            this.login?.setInValid("");
            this.password?.setInValid("");
            if ("code" in err) {
                switch (err?.code) {
                    case 401:
                        this.toasts?.show("Ошибка авторизации", "Не верный логин или пароль", ToastType.ERROR);
                        break;
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
        location.replace("/admin/panel/forgot/password");
    }
    onInputLoginHandler(_event) {
        this.login?.unsetValidate();
        // console.log(this.login?.value);
    }
    onInputPasswordHandler(_event) {
        this.password?.unsetValidate();
    }
}
