import Button, { IButton } from "../components/Button.js";
import Spinner, { ISpinner } from "../components/Spinner.js";
import { IToasts } from "../components/Toasts.js";
import Input, { IInput, IInputEventChanged } from "../components/Input.js";
import { IApi } from "../common/Api.js";
import { IValidator } from "../common/Validator.js";
import DefaultHTMLComponent from "../common/DefaultHTMLComponent.js";

export default class AuthForm extends DefaultHTMLComponent {
    // protected rootDiv: HTMLDivElement | null = null;
    protected login: IInput | null = null;
    protected btnOk: IButton | null = null;

    protected validator: IValidator | null = null;
    protected spinner: ISpinner | null = null;
    protected api: IApi | null = null;
    protected toasts: IToasts | null = null;

    constructor(id: string, validator: IValidator, api: IApi, toasts: IToasts) {
        super(id)
        // this.rootDiv = document.getElementById(id) as HTMLDivElement;
        this.validator = validator;
        this.api = api;
        this.toasts = toasts;

        if (this.rootDiv) {
            try {
                this.login = new Input(this.rootDiv.querySelector("#login"), this.onInputLoginHandler.bind(this));
                (this.login.getTarget() as HTMLInputElement)?.addEventListener("keydown", (e: KeyboardEvent) => {
                    if (e.key == "Enter") {
                        this.btnOkClick()
                    }
                })
            } catch(_error: any) {}

            this.btnOk = new Button(this.rootDiv.querySelector<HTMLButtonElement>("#btnOk"), this.btnOkClick.bind(this));

            this.spinner = new Spinner(this.rootDiv.querySelector("#spinner"));
        }

        if (!this.validator) {
            throw new Error("validator is required!");
        }

        if (!this.api) {
            throw new Error("API is required!");
        }
    }

    protected btnOkClick() {
        
    }

    protected onInputLoginHandler(_event: IInputEventChanged) {

    }
}