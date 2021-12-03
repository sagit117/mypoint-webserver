import Button from "../components/Button.js";
import Spinner from "../components/spinner.js";
import Toasts from "../components/Toasts.js";
import Input, { IInputEventChanged } from "../components/Input.js";
import Api from "../common/Api.js";
import Validator from "../common/Validator.js";

export default class AuthForm {
    protected rootDiv: HTMLDivElement | null = null;
    protected login: Input | null = null;
    protected btnOk: Button | null = null;

    protected validator: Validator | null = null;
    protected spinner: Spinner | null = null;
    protected api: Api | null = null;
    protected toasts: Toasts | null = null;

    constructor(id: string, validator: Validator, api: Api, toasts: Toasts) {
        this.rootDiv = document.getElementById(id) as HTMLDivElement;
        this.validator = validator;
        this.api = api;
        this.toasts = toasts;

        if (this.rootDiv) {
            this.login = new Input(this.rootDiv, "login", this.onInputLoginHandler.bind(this));

            this.btnOk = new Button(this.rootDiv, "btnOk", this.btnOkClick.bind(this));

            this.spinner = new Spinner(this.rootDiv, "spinner");
        } else {
            throw new Error("rootDiv is required!");
        }

        if (!this.validator) {
            throw new Error("validator is required!");
        }

        if (!this.api) {
            throw new Error("API is required!");
        }
    }

    public btnOkClick() {
        
    }

    public onInputLoginHandler(_event: IInputEventChanged) {

    }
}