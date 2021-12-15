import Api from "../common/Api.js";
import Validator from "../common/Validator.js";
import Toasts, { ToastType } from "../components/Toasts.js";
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
        if (!this.validator?.notEmpty(this.password?.value)) {
            this.password?.setInValid("Пароль не должен быть пустым!");
            return;
        }

        if (!this.validator?.isEqual(this.password?.value, this.confirmPassword?.value)) {
            this.confirmPassword?.setInValid("Подтверждение пароля должно совпадать с паролем!");
            return;
        }

        this.btnOk?.disable();
        this.btnEnter?.disable();
        this.spinner?.show();

        const hash = location.pathname.split("/").pop();

        this.api?.updatePasswordWithHash({ hash: hash || "", newPassword: this.password?.value || "newpassword" })
            .then((_res: { status: string }) => {
                this.toasts?.show("Успешно", "Пароль изменен, Вы будете перенаправлены", ToastType.SUCCESS, () => {
                    location.replace("/admin/panel/login");
                })
            })
            .catch((err: Error | { status: string, code: number }) => {
                this.btnOk?.enable();
                this.btnEnter?.enable();
                this.password?.setInValid("");
                this.confirmPassword?.setInValid("");

                if ("code" in err) {
                    switch(err?.code) {
                        case 400: this.toasts?.show("Ошибка авторизации", "Запрос или устарел или не был инициирован, запросите восстановление пароля", ToastType.ERROR); break;
                        case 401: this.toasts?.show("Ошибка авторизации", "Запрос или устарел или не был инициирован, запросите восстановление пароля", ToastType.ERROR); break;
                        case 403: this.toasts?.show("Ошибка подключения", "Запрещено", ToastType.ERROR); break;
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

    private onInputPasswordHandler(_event: IInputEventChanged) {
        this.password?.unsetValidate();
    }

    private onInputConfirmPasswordHandler(_event: IInputEventChanged) {
        this.confirmPassword?.unsetValidate();
    }
}