import { IInputEventChanged } from "../components/Input.js";
import { IApi } from "../common/Api.js";
import { IValidator } from "../common/Validator.js";
import { IToasts, ToastType } from "../components/Toasts.js";
import AuthForm from "./AuthForm.js";
import Button, { IButton } from "../components/Button.js";

/**
 * Класс для управления формой "Забыли пароль"
 */
export default class ForgotForm extends AuthForm {
    private btnEnter: IButton | null = null;

    constructor(id: string, validator: IValidator, api: IApi, toasts: IToasts) {
        super(id, validator, api, toasts);

        if (this.rootDiv) {
            this.btnEnter = new Button(this.rootDiv.querySelector("#btnEnter"), this.btnEnterClick.bind(this));
        }
    }

    /**
     * Обработчик кнопки отправить запрос
     * @returns 
     */
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

        this.btnOk?.disable();
        this.btnEnter?.disable();
        this.spinner?.show();

        this.api?.resetPassword(this.login.value)
            .then((_res: { status: string }) => {
                this.toasts?.show("Успешно", "Запрос отправлен, Вы будете перенаправлены", ToastType.SUCCESS, () => {
                    location.replace("/admin/panel/login");
                })
            })
            .catch((err: Error | { status: string, code: number }) => {
                this.btnOk?.enable();
                this.btnEnter?.enable();
                this.login?.setInValid("");

                if ("code" in err) {
                    switch(err?.code) {
                        case 400: this.toasts?.show("Ошибка авторизации", "Не верный логин", ToastType.ERROR); break;
                        case 401: this.toasts?.show("Ошибка авторизации", "Не верный логин", ToastType.ERROR); break;
                        case 429: this.toasts?.show("Предупреждение", "Слишком частые запросы, попробуйте позже", ToastType.WARNING); break;
                        case 503: this.toasts?.show("Ошибка подключения", "Сервис не доступен", ToastType.ERROR); break;

                        default: this.toasts?.show("Ошибка", err?.status, ToastType.ERROR); break;
                    }
                } else {
                    this.toasts?.show("Ошибка", err?.message, ToastType.ERROR);
                }
            })
            .finally(() => {
                this.spinner?.hide();
            })
    }

    private btnEnterClick() {
        location.replace("/admin/panel/login");
    }

    protected onInputLoginHandler(_event: IInputEventChanged) {
        this.login?.unsetValidate();
    }
}