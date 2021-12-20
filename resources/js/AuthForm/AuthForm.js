import Button from "../components/Button.js";
import Spinner from "../components/Spinner.js";
import Input from "../components/Input.js";
export default class AuthForm {
    rootDiv = null;
    login = null;
    btnOk = null;
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
            try {
                this.login = new Input(this.rootDiv, "login", this.onInputLoginHandler.bind(this));
                this.login.getTarget()?.addEventListener("keydown", (e) => {
                    if (e.key == "Enter") {
                        this.btnOkClick();
                    }
                });
            }
            catch (_error) { }
            this.btnOk = new Button(this.rootDiv, "btnOk", this.btnOkClick.bind(this));
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
    btnOkClick() {
    }
    onInputLoginHandler(_event) {
    }
}
