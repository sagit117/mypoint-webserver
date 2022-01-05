import Button from "../components/Button.js";
import Spinner from "../components/Spinner.js";
import Input from "../components/Input.js";
import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
/**
 * Базовый класс для построения формы аутентификации
 */
export default class AuthForm extends DefaultHTMLComponent {
    login = null;
    btnOk = null;
    validator = null;
    spinner = null;
    api = null;
    toasts = null;
    /**
     * Конструктор
     * @param id - ID корневого элемента
     * @param validator - класс валидатор
     * @param api - класс api
     * @param toasts - класс toast
     */
    constructor(id, validator, api, toasts) {
        super(id);
        if (this.rootDiv && "submit" in this.rootDiv) {
            this.rootDiv.addEventListener("submit", (e) => e.preventDefault());
        }
        this.validator = validator;
        this.api = api;
        this.toasts = toasts;
        if (this.rootDiv) {
            try {
                this.login = new Input(this.rootDiv.querySelector("#login"), this.onInputLoginHandler.bind(this));
                this.login.getTarget()?.addEventListener("keydown", (e) => {
                    if (e.key == "Enter") {
                        this.btnOkClick();
                    }
                });
            }
            catch (_error) { }
            this.btnOk = new Button(this.rootDiv.querySelector("#btnOk"), this.btnOkClick.bind(this));
            this.spinner = new Spinner(this.rootDiv.querySelector("#spinner"));
        }
        if (!this.validator) {
            throw new Error("validator is required!");
        }
        if (!this.api) {
            throw new Error("API is required!");
        }
    }
    btnOkClick() {
    }
    onInputLoginHandler(_event) {
    }
}
