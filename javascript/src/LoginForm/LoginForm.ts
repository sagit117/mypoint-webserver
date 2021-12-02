import Input, { IInputEventChanged } from "../components/Input.js";
import Button from "../components/Button.js";
import Spinner from "../components/spinner.js";
import Toasts, { ToastType } from "../components/Toasts.js";
import Validator from "../common/Validator.js";
import Api from "../common/Api.js";

export default class LoginForm {
    private rootDiv: HTMLDivElement | null = null;
    private login: Input | null = null;
    private password: Input | null = null;
    private btnOk: Button | null = null;
    private btnForgot: Button | null = null;
    private validator: Validator | null = null;
    private spinner: Spinner | null = null;
    private api: Api | null = null;
    private toasts: Toasts | null = null;

    constructor(id: string, validator: Validator, api: Api, toasts: Toasts) {
        this.rootDiv = document.getElementById(id) as HTMLDivElement;
        this.validator = validator;
        this.api = api;
        this.toasts = toasts;

        if (this.rootDiv) {
            this.login = new Input(this.rootDiv, "login", this.onInputLoginHandler.bind(this));
            this.password = new Input(this.rootDiv, "password", this.onInputPasswordHandler.bind(this));

            this.btnOk = new Button(this.rootDiv, "btnOk", this.btnOkClick.bind(this));
            this.btnForgot = new Button(this.rootDiv, "btnForgot", this.btnForgotClick.bind(this));

            this.spinner = new Spinner(this.rootDiv, "spinner");
        } else {
            throw new Error("rootDiv is required!")
        }

        if (!this.validator) {
            throw new Error("validator is required!")
        }

        if (!this.api) {
            throw new Error("API is required!")
        }
    }

    /** Вход */
    public btnOkClick() {
        /** проверка логина */
        if (this.login && this.validator?.isEmail(this.login.value)) {
            this.login.setValid("")
        } else {
            if (this.login) {
                this.login.setInValid("email не соответствует!");
            }

            return;
        }

        /** проверка пароля */
        if (this.password && this.validator?.notEmpty(this.password.value)) {
            this.password.setValid("")
        } else {
            if (this.password) {
                this.password.setInValid("Пароль не должен быть пустым!")
            }

            return;
        }

        this.btnOk?.disable()
        this.btnForgot?.disable()
        this.spinner?.show()

        /** запрос к серверу */
        this.api?.login({
            email: this.login.value,
            password: this.password.value
        })
            .then(res => {
                console.log(res)
            })
            .catch((err: Error | { status: string, code: number }) => {
                this.btnOk?.enable();
                this.btnForgot?.enable();
                this.login?.setInValid("");
                this.password?.setInValid("");

                if ("code" in err) {
                    switch(err?.code) {
                        case 401: this.toasts?.show("Ошибка авторизации", "Не верный логин или пароль", ToastType.ERROR); break;
                        case 503: this.toasts?.show("Ошибка подключения", "Сервис не доступен", ToastType.ERROR); break;

                        default: this.toasts?.show("Ошибка", err?.status, ToastType.ERROR); break;
                    }
                } else {
                    this.toasts?.show("Ошибка", err?.message, ToastType.ERROR);
                }
            })
            .finally(() => {
                this.spinner?.hide()
            })
    }

    public btnForgotClick() {
        console.log('forgot')
    }

    public onInputLoginHandler(_event: IInputEventChanged) {
        this.login?.unsetValidate()

        console.log(this.login?.value)
    }

    public onInputPasswordHandler(_event: IInputEventChanged) {
        this.password?.unsetValidate()

        console.log(this.password?.value)
    }
}