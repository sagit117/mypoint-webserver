import Button from "../components/Button.js";
import Spinner from "../components/Spinner.js";
import Input from "../components/Input.js";
import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";
export default class AuthForm extends DefaultHTMLComponent {
    // protected rootDiv: HTMLDivElement | null = null;
    login = null;
    btnOk = null;
    validator = null;
    spinner = null;
    api = null;
    toasts = null;
    constructor(id, validator, api, toasts) {
        super(id);
        // this.rootDiv = document.getElementById(id) as HTMLDivElement;
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
