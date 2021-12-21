import { ToastType } from "../components/Toasts.js";
import Input from "../components/Input.js";
import AuthForm from "./AuthForm.js";
import Button from "../components/Button.js";
/**
 * Класс для управления формой ввода нового пароля, применяется к восстановлению пароля из почты
 */
export default class ResetPasswordForm extends AuthForm {
    password = null;
    confirmPassword = null;
    btnEnter = null;
    constructor(id, validator, api, toasts) {
        super(id, validator, api, toasts);
        if (this.rootDiv) {
            this.password = new Input(this.rootDiv.querySelector("#password"), this.onInputPasswordHandler.bind(this));
            this.confirmPassword = new Input(this.rootDiv.querySelector("#confirm"), this.onInputConfirmPasswordHandler.bind(this));
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
            this.btnEnter = new Button(this.rootDiv.querySelector("#btnEnter"), this.btnEnterClick.bind(this));
        }
    }
    /** Обработчки кнопки смены пароля */
    btnOkClick() {
        if (!this.validator?.notEmpty(this.password?.value)) {
            this.password?.setInValid("Пароль не должен быть пустым!");
            return;
        }
        if (!this.validator?.isEqual(this.password?.value || "", this.confirmPassword?.value || "")) {
            this.confirmPassword?.setInValid("Подтверждение пароля должно совпадать с паролем!");
            return;
        }
        this.btnOk?.disable();
        this.btnEnter?.disable();
        this.spinner?.show();
        const hash = location.pathname.split("/").pop();
        this.api?.updatePasswordWithHash({ hash: hash || "", newPassword: this.password?.value || "newpassword" })
            .then((_res) => {
            this.toasts?.show("Успешно", "Пароль изменен, Вы будете перенаправлены", ToastType.SUCCESS, () => {
                location.replace("/admin/panel/login");
            });
        })
            .catch((err) => {
            this.btnOk?.enable();
            this.btnEnter?.enable();
            this.password?.setInValid("");
            this.confirmPassword?.setInValid("");
            if ("code" in err) {
                switch (err?.code) {
                    case 400:
                        this.toasts?.show("Ошибка авторизации", "Запрос или устарел или не был инициирован, запросите восстановление пароля", ToastType.ERROR);
                        break;
                    case 401:
                        this.toasts?.show("Ошибка авторизации", "Запрос или устарел или не был инициирован, запросите восстановление пароля", ToastType.ERROR);
                        break;
                    case 403:
                        this.toasts?.show("Ошибка подключения", "Запрещено", ToastType.ERROR);
                        break;
                    case 429:
                        this.toasts?.show("Предупреждение", "Слишком частые запросы, попробуйте позже", ToastType.WARNING);
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
    btnEnterClick() {
        location.replace("/admin/panel/login");
    }
    onInputPasswordHandler(_event) {
        this.password?.unsetValidate();
    }
    onInputConfirmPasswordHandler(_event) {
        this.confirmPassword?.unsetValidate();
    }
}
